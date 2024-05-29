import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TodoList from "./TodoList"


describe('checks ToDo List componenet', () => {
  it('renders without crashing', () => {
    render(<TodoList />);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<TodoList />);
    expect(asFragment).toMatchSnapshot();
  });
});
