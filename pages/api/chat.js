import prisma from "../../lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from '/pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
    const body = req.body;
    const session = await getServerSession(req, res, authOptions);

    if (!body) {
        return req.status(400);
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    })

    const chat = await prisma.chat.findFirst({
        where: {
            id: parseInt(body.id),
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