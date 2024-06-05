import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Nav from './src/components/Nav';

const defaultDogs = [
  { name: 'Whiskey' },
  { name: 'Duke' },
  { name: 'Perry' },
  { name: 'Tubby' }
];

describe("Nav component", () => {
    it("renders a navbar with navigation links", () => {
        render(
            <MemoryRouter>
                <Nav dogs={defaultDogs} />
            </MemoryRouter>
        )

        expect(screen.getByText('Whiskey')).toBeInTheDocument();
        expect(screen.getByText('Duke')).toBeInTheDocument();
        expect(screen.getByText('Perry')).toBeInTheDocument();
        expect(screen.getByText('Tubby')).toBeInTheDocument();
    })
})