import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "@/components/profile/profile";

describe("Profile - rendering", () => {
    it("Should render profile name correctly", () => {
        render(<Profile name={"Example"} style={"medium"}/>);

        expect(screen.getByRole("button")).toHaveTextContent("E");
    });

    it("Should render profile styles correctly", () => {
        render(<Profile name={"Small"} style={"small"} />);

        expect(screen.getByRole("button", { name: "S" })).toHaveClass("buttonSmall");
    });
});