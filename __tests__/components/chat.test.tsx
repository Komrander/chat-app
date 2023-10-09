import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chat from "@/components/chat/chat";
import { Message } from "@/types/types";
import { PusherMock } from "pusher-js-mock";

jest.mock("pusher-js", () => {
    const Pusher = require("pusher-js-mock").PusherMock;
    return Pusher;
})

const mockMessages: Message[] = [
    {
        id: 1,
        content: "text",
        date: new Date(),
        chatId: 1,
        userId: 2,
        user: {
            name: "Name"
        },
    }
]

const mockMessage: Message = {
    id: 2,
    content: "text 2",
    date: new Date(),
    chatId: 1,
    userId: 1,
    user: {
        name: "My name"
    },
}

describe("Chat - rendering", () => {
    it("Should render messages", ()=> {
        render(<Chat messages={mockMessages} chatId={1} userId={1}/>);

        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^Name$/);
        expect(screen.getByRole("paragraph")).toHaveTextContent(/^text$/);
    });

    it("Should display messages sent from pusher", async () => {
        const pusher = new PusherMock();
        const channel = pusher.subscribe("1");

        render(<Chat messages={mockMessages} chatId={1} userId={1}/>);

        act(() => {
            channel.emit("message", {
                message: JSON.stringify(mockMessage),
            });
        });
        
        expect(screen.getAllByRole("paragraph")[0]).toHaveTextContent(/^text 2$/);
    })
});