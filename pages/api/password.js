import prisma from "../../lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from '/pages/api/auth/[...nextauth]';
var bcrypt = require('bcrypt');

export default async function handler(req, res) {
    const body = req.body;
    const session = await getServerSession(req, res, authOptions);

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    })

    const isValid = await bcrypt.compare(body.oldPassword, user.password)
  
    if (!body.newPassword || !session) {
        return res.status(400).json({ data: 'Missing data' });
    } else if (!isValid) {
        return res.status(400).json({ data: 'Wrong password' });
    }
    
    bcrypt.hash(body.newPassword, 10, async function(err, hash) {
        const userUpdate = await prisma.user.update({
            where: {
                email: session.user.email,
            },
            data: {
                password: hash,
            },
        })
    });
  
    res.status(200).json({ success: "success" });
}