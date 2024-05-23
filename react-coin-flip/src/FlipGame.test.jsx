import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import FlipGame from "./FlipGame";


it("loads properly without crashing", () => {
    render(<FlipGame />)
})

it("matches snapshot", () => {
    const { asFragment } = render(<FlipGame />);
    expect(asFragment()).toMatchSnapshot();
})

it("updates tails count correctly with button is clicked", () => {
    const random = vi.spyOn(Math, 'random');

    const { container } = render(<FlipGame />);
    const button = screen.getByText("Flip Coin");
    const tailsCountElement = container.querySelector('.FlipGame-tails-count');
    const headsCountElement = container.querySelector('.FlipGame-heads-count');
    
    random.mockReturnValueOnce(0);
    fireEvent.click(button);
    expect(tailsCountElement).toBeInTheDocument();
    expect(tailsCountElement.textContent).toContain("1");
    expect(headsCountElement).toBeInTheDocument();
    expect(headsCountElement.textContent).toContain("0");

    random.mockRestore();
})
it("updates heads count correctly with button is clicked", () => {
    const random = vi.spyOn(Math, 'random');

    const { container } = render(<FlipGame />);
    const button = screen.getByText("Flip Coin");
    const headsCountElement = container.querySelector('.FlipGame-heads-count');
    const tailsCountElement = container.querySelector('.FlipGame-tails-count');
    
    random.mockReturnValueOnce(0.5);
    fireEvent.click(button);
    expect(tailsCountElement).toBeInTheDocument();
    expect(tailsCountElement.textContent).toContain("0");
    expect(headsCountElement).toBeInTheDocument();
    expect(headsCountElement.textContent).toContain("1");

    random.mockRestore();
})
it("updates heads and tail count correctly with button is clicked multiple times", () => {
    const random = vi.spyOn(Math, 'random');

    const { container } = render(<FlipGame />);
    const button = screen.getByText("Flip Coin");
    const headsCountElement = container.querySelector('.FlipGame-heads-count');
    const tailsCountElement = container.querySelector('.FlipGame-tails-count');
    
    random.mockReturnValueOnce(0.5);
    fireEvent.click(button);
    expect(tailsCountElement).toBeInTheDocument();
    expect(tailsCountElement.textContent).toContain("0");
    expect(headsCountElement).toBeInTheDocument();
    expect(headsCountElement.textContent).toContain("1");

    random.mockReturnValueOnce(0.5);
    fireEvent.click(button);
    expect(tailsCountElement).toBeInTheDocument();
    expect(tailsCountElement.textContent).toContain("0");
    expect(headsCountElement).toBeInTheDocument();
    expect(headsCountElement.textContent).toContain("2");

    random.mockReturnValueOnce(0);
    fireEvent.click(button);
    expect(tailsCountElement).toBeInTheDocument();
    expect(tailsCountElement.textContent).toContain("1");
    expect(headsCountElement).toBeInTheDocument();
    expect(headsCountElement.textContent).toContain("2");

    random.mockRestore();
})

