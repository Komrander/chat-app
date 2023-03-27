import prisma from "../../lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    const body = req.body;
    const session = await getServerSession(req, res, authOptions);

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        }
    })
  
    if (!body.name || !session || !user ) {
      return res.status(400).json({ data: 'Missing data' });
    }

    if (body.name == user.name) {
        return res.status(400).json({ data: 'Input is identical to current username' });
    }

    const userUpdate = await prisma.user.update({
        where: {
            email: session.user.email,
        },
        data: {
            name: body.name,
        },
    })
  
    res.status(200).json({ success: "success" });
}