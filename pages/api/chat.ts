import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    const session = await getServerSession(req, res, authOptions);

    if (!body?.chatId || !session?.user?.email) {
        return res.status(400).json({ data: "Missing data" });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    })

    if (!user) {
        return res.status(500).json({ data: "Couldn't find user" });
    }

    const chat = await prisma.chat.findFirst({
        where: {
            id: body.id,
            participants: {
                some: {
                    id: user.id,
                },
            },
        },
        include: {
            messages: {
                orderBy: {
                    date: "desc",
                },
                include: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    })
  
    if (!chat ) {
      return res.status(500).json({ data: "Couldn't find chat" });
    }

    res.status(200).json(chat);
}