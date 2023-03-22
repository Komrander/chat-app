import prisma from "../../lib/prismadb";

export default function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
  
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)
  
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.name) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'Skill issue' })
    }

    async function addChat() {
        const user = await prisma.chat.create({
            data: {
                name: body.name,
                type: "GROUP",
                participants: {
                    connect: { id: 1 },
                },
            },
        })
    }

    addChat();
  
    // Found the name.
    // Sends a HTTP success code
    res.redirect(200, '/app/chats/1')
}