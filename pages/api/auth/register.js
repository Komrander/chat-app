import prisma from "../../../lib/prismadb";
const bcrypt = require("bcrypt");

export default function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
  
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)
  
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.email || !body.name || !body.password) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'Skill issue' })
    }

    bcrypt.hash(body.password, 10, function(err, hash) {
        async function addUser() {
            const user = await prisma.user.create({
                data: {
                    email: body.email,
                    name: body.name,
                    password: hash
                },
            })
        }
    
        addUser();
    });
  
    // Found the name.
    // Sends a HTTP success code
    res.status(200).json({ data: `${body.email} ${body.name} ${body.password}` })
}