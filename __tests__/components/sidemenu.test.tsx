import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidemenu from "@/components/sidemenu/sidemenu";
import { PopupContext } from "@/contexts/popupContext";
import { FullChat } from "@/types/types";

const setPopupDisplay = jest.fn();
const popupDisplay = "none";

const exampleChat: FullChat = {
  id: 1,
  name: "Group chat",
  type: "GROUP",
  participants: [],
  messages: [],
};

describe("Sidemenu - rendering", () => {
  it("Should render the chat name", () => {
    render(
      <PopupContext.Provider value={{ popupDisplay, setPopupDisplay }}>
        <Sidemenu chatName={"Group chat"} chat={exampleChat} />
      </PopupContext.Provider>,
    );

    expect(
      screen.getByRole("heading", { name: /^Group chat$/ }),
    ).toBeInTheDocument();
  });
});
