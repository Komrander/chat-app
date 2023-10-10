import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    const session = await getServerSession(req, res, authOptions);
    const Pusher = require("pusher");

    if (!body?.chatId || !body?.message || !session?.user?.email ) {
        return res.status(400).json({ data: "Missing data" });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    })

    if (!user) {
        return res.status(500);
    }

    const chat = await prisma.chat.findFirst({
        where: {
            id: body.chatId,
            participants: {
                some: {
                    id: user.id,
                },
            },
        },
    })
  
    if (!chat ) {
        return res.status(500);
    }

    const messageContent = body.message.trim();

    const message = await prisma.message.create({
        data: {
            content: messageContent,
            userId: user.id,
            chatId: body.chatId,
        },
        include: {
            user: {
                select: {
                    name: true,
                },
            },
        },
    })

    if (message) {
        const pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.NEXT_PUBLIC_PUSHER_KEY,
            secret: process.env.PUSHER_SECRET,
            cluster: "eu",
            useTLS: true,
        });

        await pusher.trigger(body.chatId.toString(), "message", {
            message: JSON.stringify(message),
        })
    }
  
    res.status(200).json({ success: "success" });
}