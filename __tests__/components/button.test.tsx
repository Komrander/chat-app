import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "@/components/button/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

describe("Button - rendering", () => {
  it("Should render a button title", () => {
    render(<Button title={"Click me"} />);

    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("Should render button styles correctly", () => {
    render(<Button title={"Click me"} style={"negative"} />);

    expect(screen.getByRole("button", { name: "Click me" })).toHaveClass(
      "negative",
    );
  });

  it("Should render a button icon", () => {
    render(
      <>
        <Button title={"First"} icon={faPlus} />
        <Button title={"Second"} />
      </>,
    );

    expect(
      screen.getByRole("button", { name: "First" }).querySelector("svg"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Second" }).querySelector("svg"),
    ).not.toBeInTheDocument();
  });
});

describe("Button - click", () => {
  it("Should run a callback on click", () => {
    const mockCallback = jest.fn();
    render(<Button title={"Click me"} onClick={() => mockCallback(true)} />);

    screen.getByRole("button", { name: "Click me" }).click();
    expect(mockCallback).toHaveBeenCalledWith(true);
  });

  it("Should submit a form on click", () => {
    const mockCallback = jest.fn();
    render(
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          mockCallback(true);
        }}
      >
        <Button title={"Click me"} type={"submit"} />
      </form>,
    );

    screen.getByRole("button", { name: "Click me" }).click();
    expect(mockCallback).toHaveBeenCalledWith(true);
  });
});
