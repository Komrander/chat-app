import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Icon from "@/components/icon/icon";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

describe("Icon - rendering", () => {
    it("Should render icon", () => {
        render(<Icon icon={faPlus} />);

        expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
    });
});

describe("Icon - click", () => {
    it("Should call mockCallback when clicked", () => {
        const mockCallback = jest.fn();
        render(<Icon icon={faPlus} onClick={() => mockCallback()} />);

        screen.getByRole("button").click();
        expect(mockCallback).toHaveBeenCalled();
    });

    it("Should submit a form when clicked", () => {
        const mockCallback = jest.fn();
        render(
            <form onSubmit={(e: any) => {e.preventDefault(); mockCallback()}}>
                <Icon icon={faPlus} type={"submit"} />
            </form>
        );

        screen.getByRole("button").click();
        expect(mockCallback).toHaveBeenCalled();
    });
});