import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    const session = await getServerSession(req, res, authOptions);

    if (!body?.id || !session?.user?.email) {
        return res.status(400);
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
            id: body.id,
            participants: {
                some: {
                    id: user.id,
                },
            },
        },
        include: {
            participants: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
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
  
    if (!session || !chat ) {
      return res.status(404);
    }

    res.status(200).json(chat);
}