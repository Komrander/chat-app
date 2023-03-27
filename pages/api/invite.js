import prisma from "../../lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from '/pages/api/auth/[...nextauth]';

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

    const invitedUser = await prisma.user.findUnique({
        where: {
            email: body.email,
        },
    })
  
    if (!body.email || !session || !chat || !invitedUser || chat.type != "GROUP" ) {
      return res.status(400).json({ data: 'Missing data' });
    }

    const update = await prisma.chat.update({
        where: {
            id: parseInt(url[url.length-1]),
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