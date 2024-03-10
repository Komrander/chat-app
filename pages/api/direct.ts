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

  if (!body?.email || !session?.user?.email) {
    return res.status(400).json({ data: "Missing data" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return res.status(500);
  }

  const existingChat = await prisma.chat.findFirst({
    where: {
      type: "DIRECT",
      AND: [
        { participants: { some: { email: session.user.email } } },
        { participants: { some: { email: body.email } } },
      ],
    },
  });

  if (existingChat) {
    return res.status(400).json({ data: "Chat already exist" });
  }

  const chat = await prisma.chat.create({
    data: {
      name: "direct",
      type: "DIRECT",
      participants: {
        connect: [{ email: session.user.email }, { email: body.email }],
      },
    },
  });

  res.status(200).json({ success: "success", id: chat.id });
}
