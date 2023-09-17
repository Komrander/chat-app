import prisma from "../../lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from '/pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    const chatId = req.body.chatId;

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    })

    const chat = await prisma.chat.findFirst({
        where: {
            id: chatId,
            participants: {
                some: {
                    id: user.id,
                },
            },
        },
        include: { participants: true },
    })
  
    if (!session || !chat ) {
      return res.status(400).json({ data: 'Missing data' });
    }

    if (chat.type == "DIRECT" || chat.participants.length == 1) {
        const deleteChat = await prisma.chat.delete({
            where: {
                id: chatId,
            },
        })
    } else if (chat.type == "GROUP") {
        const updateChat = await prisma.chat.update({
            where: {
                id: chatId,
            },
            data: {
                participants: {
                    disconnect: { email: session.user.email },
                },
            },
        })
    }

    res.status(200).json({ success: "success" });
}