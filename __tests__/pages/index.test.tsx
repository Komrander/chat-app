import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LandingPage from "@/pages/index";
import { SessionProvider } from "next-auth/react";

describe("Landing page - Rendering", () => {
    it("Renders as authenticated", ()=> {
        render(
            <SessionProvider session={{expires: "1",user: { email: "user@users.com"},}}>
                <LandingPage />
            </SessionProvider>
        );

        expect(screen.getByRole("button", { name: "Open the application" })).toBeInTheDocument();
    });

    it("Renders as not authenticated", ()=> {
        render(
            <SessionProvider session={null}>
                <LandingPage />
            </SessionProvider>
        );

        expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Create an account" })).toBeInTheDocument();
    });
});