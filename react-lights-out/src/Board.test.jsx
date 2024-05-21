import { fireEvent, render, getByRole, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Board from "./Cell"

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
    it('updated board state correctly', () => {
        render(<Board nrows={3} ncols={3} chanceLightStartsOn={0.5}/>)
        const cellToFlip = screen.getByRole('cell');
        const initialBoardState = screen.getByRole('grid');
        console.log(initialBoardState);
        fireEvent.click(cellToFlip);
        const updatedBoardState = screen.getByRole('grid');
        console.log(updatedBoardState)
        // Assert that the board state has been updated correctly
        expect(initialBoardState).toEqual(updatedBoardState);
    })
})

describe('Board component', () => {
    it('clicking on a cell toggles its state', async () => {
      const { getByTestId } = render(Board, { props: { nrows: 3, ncols: 3, chanceLightStartsOn: 0 } });
      
      // Get the cell element
      const cell = getByTestId('cell-1-1');
  
      // Assert that the initial state of the cell is false (off)
      expect(cell.className).toBe('Cell Cell-off');
  
      // Click on the cell
      await fireEvent.click(cell);
  
      // Assert that the state of the cell is toggled to true (on)
      expect(cell.className).toBe('Cell Cell-on');
  
      // Click on the cell again
      await fireEvent.click(cell);
  
      // Assert that the state of the cell is toggled back to false (off)
      expect(cell.className).toBe('Cell Cell-off');
    });
  });