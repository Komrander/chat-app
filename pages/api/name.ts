import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    const session = await getServerSession(req, res, authOptions);

    if (!body?.name || !session?.user?.email ) {
        return res.status(400).json({ data: "Missing data" });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        }
    })
  
    if (!user ) {
      return res.status(400).json({ data: "Missing data" });
    }

    if (body.name == user.name) {
        return res.status(400).json({ data: "Input is identical to current username" });
    }

    await prisma.user.update({
        where: {
            email: session.user.email,
        },
        data: {
            name: body.name,
        },
    })
  
    res.status(200).json({ success: "success" });
}