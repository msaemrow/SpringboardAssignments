import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Cell from "./Cell"

describe('checks Cell componenet', () => {
    it('renders without crashing', () => {
        render(<Cell flipCellsAroundMe isLit={true}/>);
      });

  it('matches snapshot', () => {
    const { asFragment } = render(<Cell flipCellsAroundMe isLit={true}/>);
    expect(asFragment).toMatchSnapshot();
  });
});

describe('test', () => {
    it('checks truthy', () => {
        expect(4+4).toBe(8);
    })
})