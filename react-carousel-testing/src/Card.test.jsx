import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";
import TEST_IMAGES from "./_testCommon.js";
import { it } from "vitest";

it("loads Card without crashing", () => {
    render(<Card
      caption={TEST_IMAGES[0].caption}
      src={TEST_IMAGES[0].caption}
      currNum={0}
      totalNum={0}
    />);  
  });


  it('matches snapshot', () => {
    const { asFragment } = render(
      <Card
      caption={TEST_IMAGES[0].caption}
      src={TEST_IMAGES[0].caption}
      currNum={0}
      totalNum={0}
    />);
    expect(asFragment()).toMatchSnapshot();
  })
