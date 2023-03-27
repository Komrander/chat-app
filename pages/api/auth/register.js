import prisma from "/lib/prismadb";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
    const body = req.body
  
    if (!body.email || !body.name || !body.password) {
      return res.status(400).json({ data: 'Skill issue' })
    }

    bcrypt.hash(body.password, 10, async function(err, hash) {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: hash,
            },
        })
    });
  
    res.status(200).json({ success: "success" })
}