import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (!body?.name || !session?.user?.email) {
    return res.status(400).json({ data: "Missing data" });
  }

  const chat = await prisma.chat.create({
    data: {
      name: body.name,
      type: "GROUP",
      participants: {
        connect: { email: session.user.email },
      },
    },
  });

  res.status(200).json({ success: "success", id: chat.id });
}
