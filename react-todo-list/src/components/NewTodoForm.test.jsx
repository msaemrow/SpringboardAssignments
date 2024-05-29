import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NewTodoForm from "./NewTodoForm"


describe('checks NewTodoForm componenet', () => {
  it('renders without crashing', () => {
    render(<NewTodoForm />);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<NewTodoForm />);
    expect(asFragment).toMatchSnapshot();
  });
});
