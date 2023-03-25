import prisma from "../../lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    const body = req.body;
    const session = await getServerSession(req, res, authOptions);

    const user = await prisma.user.findUnique({
        where: { email: body.email },
    })
  
    if (!user || !session ) {
      return res.status(400).json({ data: 'Missing data' });
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
  
    res.status(200).json({ success: "success" });
}