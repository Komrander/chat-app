import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatInput from "@/components/chatInput/chatInput";
import { handleSendMessage } from "@/services/apiCalls";

jest.mock("@/services/apiCalls", () => ({
  handleSendMessage: jest.fn(),
}));

describe("Chat Input - rendering", () => {
  it("Should render input placeholder", () => {
    render(<ChatInput chatName={"My chat"} chatId={1} />);

    expect(
      screen.getByPlaceholderText(/^Type a message to My chat...$/),
    ).toBeInTheDocument();
  });
});

describe("Chat Input - submit", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should send a message to pusher with button", () => {
    render(<ChatInput chatName={"My chat"} chatId={1} />);

    act(() => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "hello" },
      });
      screen.getByRole("button").click();
    });

    expect(handleSendMessage).toHaveBeenCalledWith("hello", 1);
  });

  it("Should send a message to pusher with enter key press", () => {
    render(<ChatInput chatName={"My chat"} chatId={1} />);
    const textbox = screen.getByRole("textbox");

    act(() => {
      fireEvent.change(textbox, { target: { value: "hello" } });
      fireEvent.keyDown(textbox, { key: "Enter" });
    });

    expect(handleSendMessage).toHaveBeenCalledWith("hello", 1);
  });
});
