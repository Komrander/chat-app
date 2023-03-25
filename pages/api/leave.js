import prisma from "../../lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    const body = req.body;
    const session = await getServerSession(req, res, authOptions);
    let url = req.headers.referer.split("/");

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    })

    const chat = await prisma.chat.findFirst({
        where: {
            id: parseInt(url[url.length-1]),
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
                id: parseInt(url[url.length-1]),
            },
        })
    } else if (chat.type == "GROUP") {
        const updateChat = await prisma.chat.update({
            where: {
                id: parseInt(url[url.length-1]),
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