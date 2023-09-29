import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    const session = await getServerSession(req, res, authOptions);

    if (!body?.chatId || !session?.user?.email ) {
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
        include: { participants: true },
    })
  
    if (!chat) {
        return res.status(500);
    }

    if (chat.type == "DIRECT" || chat.participants.length == 1) {
        await prisma.chat.delete({
            where: {
                id: body.chatId,
            },
        })
    } else if (chat.type == "GROUP") {
        await prisma.chat.update({
            where: {
                id: body.chatId,
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