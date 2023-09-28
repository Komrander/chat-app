import prisma from "@/lib/prisma";

import bcrypt from "bcrypt";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body
  
    if (!body.email || !body.name || !body.password) {
      return res.status(400).json({ data: "Missing data" })
    }

    bcrypt.hash(body.password, 10, async function(err, hash) {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: hash,
            },
        })

        if (user) {
            return res.status(200).json({ success: "success" });
        }
    });
  
    return res.status(500);
}

export const config = {
    api: {
      externalResolver: true,
    },
  }