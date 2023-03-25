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
    })
  
    if (!body.message || !session || !chat ) {
      return res.status(400).json({ data: 'Missing data' });
    }

    const message = await prisma.message.create({
        data: {
            content: body.message,
            userId: user.id,
            chatId: chat.id,
        },
    })
  
    res.status(200).json({ success: "success" });
}