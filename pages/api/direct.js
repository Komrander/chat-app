import prisma from "../../lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from '/pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
    const body = req.body;
    const session = await getServerSession(req, res, authOptions);

    const user = await prisma.user.findUnique({
        where: { email: body.email },
    })

    const existingChat = await prisma.chat.findFirst({
        where: {
            type: "DIRECT",
            participants: {
                some: {
                    email: session.user.email,
                    email: body.email,
                },
            },
        },
    })
  
    if (!session) {
        return res.status(400).json({ data: 'Missing data' });
    } else if (existingChat) {
        return res.status(400).json({ data: 'Chat already exist' })
    } else if (!user) {
        return res.status(400).json({ data: 'User doesnt exist' })
    } else if (user.email == session.user.email)
        return res.status(400).json({ data: 'Cannot message self' })
    }

    const chat = await prisma.chat.create({
        data: {
            name: "direct",
            type: "DIRECT",
            participants: {
                connect: [{ email: session.user.email }, { email: body.email }],
            },
        },
    })
  
    res.status(200).json({ success: "success", id: chat.id });
}
