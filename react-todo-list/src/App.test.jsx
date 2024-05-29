import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from "./App"


describe('checks ToDo List componenet', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment).toMatchSnapshot();
  });
});
