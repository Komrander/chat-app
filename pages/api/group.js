import prisma from "../../lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body;
    const session = await getServerSession(req, res, authOptions);
  
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.name || !session ) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'Missing data' });
    }

    const chat = await prisma.chat.create({
        data: {
            name: body.name,
            type: "GROUP",
            participants: {
                connect: { email: session.user.email },
            },
        },
    })
  
    // Found the name.
    // Sends a HTTP success code
    res.status(200).json({ success: "success" });
}