import { fireEvent, render, getByRole, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Board from "./Board"

describe('checks Board componenet', () => {
  it('renders without crashing', () => {
    render(<Board />);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Board />);
    expect(asFragment).toMatchSnapshot();
  });
});

describe('Board component', () => {
    it('Update state of cell that is clicked', () => {
      const { container } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0.5}/>);
      const cell = container.querySelector('[id="0-0"]');
      const initialClassName = cell.className;
      expect(cell).toHaveClass(initialClassName);
      fireEvent.click(cell);
      const updatedClassName = cell.className;
      expect(updatedClassName).not.toBe(initialClassName);
    });

    it('Update state of cells adjacent to the cell that is clicked', () => {
      const { container } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0.5}/>);
      const cell = container.querySelector('[id="0-0"]');
      const cellRight = container.querySelector('[id="0-1"]');
      const cellDown = container.querySelector('[id="1-0"]');
      const rightInitialClassName = cellRight.className;
      const downInitialClassName = cellDown.className;
      expect(cellRight).toHaveClass(rightInitialClassName); 
      expect(cellDown).toHaveClass(downInitialClassName); 
      fireEvent.click(cell);
      const rightUpdatedClassName = cellRight.className;
      const downUpdatedClassName = cellDown.className;
      expect(rightUpdatedClassName).not.toBe(rightInitialClassName);
      expect(downUpdatedClassName).not.toBe(downInitialClassName);
    });

    it('Does not update state of cell that is not adjacent to the cell that was clicked', () => {
      const { container } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0.5}/>);
      const cell = container.querySelector('[id="0-0"]');
      const notAdjacentCell = container.querySelector('[id="2-2"]');
      const notAdjacentInitialClassName = notAdjacentCell.className;
      expect(notAdjacentCell).toHaveClass(notAdjacentInitialClassName);
      fireEvent.click(cell);
      const notAdjacentUpdatedClassName = notAdjacentCell.className;
      expect(notAdjacentUpdatedClassName).toBe(notAdjacentInitialClassName);
    });
})