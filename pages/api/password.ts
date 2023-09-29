import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import bcrypt from "bcrypt";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    const session = await getServerSession(req, res, authOptions);

    if (!body?.oldPassword || !body?.newPassword || !session?.user?.email ) {
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

    const isValid = await bcrypt.compare(body.oldPassword, user.password)
  
    if (!isValid) {
        return res.status(400).json({ data: "Wrong password" });
    }
    
    bcrypt.hash(body.newPassword, 10, async function(err, hash) {
        if (session?.user?.email) {
            await prisma.user.update({
                where: {
                    email: session.user.email,
                },
                data: {
                    password: hash,
                },
            })
        }
    });
  
    res.status(200).json({ success: "success" });
}