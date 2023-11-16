import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/components/header/header";
import { PopupContext } from "@/contexts/popupContext";

const setPopupDisplay = jest.fn();
const popupDisplay = "none";

describe("Header - rendering", () => {
    it("Should render dashboard title", () => {
        render(
            <PopupContext.Provider value={{ popupDisplay, setPopupDisplay }}>
                <Header/>
            </PopupContext.Provider>
        );

        expect(screen.getByText(/^Dashboard$/)).toBeInTheDocument();
    });

    it("Should render chat title", () => {
        render(
            <PopupContext.Provider value={{ popupDisplay, setPopupDisplay }}>
                <Header chatName={"My chat"}/>
            </PopupContext.Provider>
        );

        expect(screen.getByText(/^My chat$/)).toBeInTheDocument();
    });
});

describe("Header - click", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("Should change popup state when settings is clicked", () => {
        render(
            <PopupContext.Provider value={{ popupDisplay, setPopupDisplay }}>
                <Header chatName={"User"}/>
            </PopupContext.Provider>
        );

        act(() => {
            screen.getByRole("button").click();
        });

        expect(setPopupDisplay).toHaveBeenCalledWith("settings");
    });
});