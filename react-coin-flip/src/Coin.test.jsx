import { render } from "@testing-library/react";
import Coin from "./Coin";
import { expect, it } from "vitest";


it("loads Coin without crashing", () => {
    render(<Coin coinSide={null} />)
})

it("matches snapshot", () => {
    const { asFragment } = render(
        <Coin coidSide={null} />
    );
    expect(asFragment()).toMatchSnapshot();
})

