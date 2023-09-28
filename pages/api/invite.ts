import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    const session = await getServerSession(req, res, authOptions);

    if (!body?.chatId || !body?.email || !session?.user?.email ) {
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

    const invitedUser = await prisma.user.findUnique({
        where: {
            email: body.email,
        },
    })
  
    if (!chat || chat.type != "GROUP" || !invitedUser ) {
      return res.status(400).json({ data: "Missing data" });
    }

    await prisma.chat.update({
        where: {
            id: body.chatId,
        },
        data: {
            participants: { 
                connect: {
                    id: invitedUser.id,
                },
            },
        },
    })
  
    res.status(200).json({ success: "success" });
}