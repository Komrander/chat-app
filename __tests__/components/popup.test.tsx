import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Popup from "@/components/popup/popup";
import { PopupContext } from "@/contexts/popupContext";

const setPopupDisplay = jest.fn();

describe("Popup - rendering", () => {
  it("Should render nothing", () => {
    render(
      <PopupContext.Provider value={{ popupDisplay: "none", setPopupDisplay }}>
        <Popup />
      </PopupContext.Provider>,
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("Should render adding chat options", () => {
    render(
      <PopupContext.Provider value={{ popupDisplay: "add", setPopupDisplay }}>
        <Popup />
      </PopupContext.Provider>,
    );

    expect(
      screen.getByRole("button", { name: /^Create group$/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^Start direct chat$/ }),
    ).toBeInTheDocument();
  });

  it("Should render adding a group", () => {
    render(
      <PopupContext.Provider
        value={{ popupDisplay: "addGroup", setPopupDisplay }}
      >
        <Popup />
      </PopupContext.Provider>,
    );

    expect(
      screen.getByRole("button", { name: /^Create new group$/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("Should render adding a direct chat", () => {
    render(
      <PopupContext.Provider
        value={{ popupDisplay: "addDirect", setPopupDisplay }}
      >
        <Popup />
      </PopupContext.Provider>,
    );

    expect(
      screen.getByRole("button", { name: /^Start direct chat$/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("Should render sending an invite", () => {
    render(
      <PopupContext.Provider
        value={{ popupDisplay: "invite", setPopupDisplay }}
      >
        <Popup />
      </PopupContext.Provider>,
    );

    expect(
      screen.getByRole("button", { name: /^Send invite$/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("Should render changing the username", () => {
    render(
      <PopupContext.Provider
        value={{ popupDisplay: "changeName", setPopupDisplay }}
      >
        <Popup />
      </PopupContext.Provider>,
    );

    expect(
      screen.getByRole("button", { name: /^Change username$/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("Should render changing the password", () => {
    render(
      <PopupContext.Provider
        value={{ popupDisplay: "changePassword", setPopupDisplay }}
      >
        <Popup />
      </PopupContext.Provider>,
    );

    expect(
      screen.getByRole("button", { name: /^Change password$/ }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("oldPassword")).toBeInTheDocument();
    expect(screen.getByTestId("newPassword")).toBeInTheDocument();
  });

  it("Should render settings", () => {
    render(
      <PopupContext.Provider
        value={{ popupDisplay: "settings", setPopupDisplay }}
      >
        <Popup />
      </PopupContext.Provider>,
    );

    expect(
      screen.getByRole("button", { name: /^Change username$/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^Change password$/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^Logout$/ }),
    ).toBeInTheDocument();
  });
});
