import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import ColorsList from "./src/components/ColorsList"

const initialColors = [
    { color: 'Red', hexCode: '#FF0000' },
    { color: 'White', hexCode: '#FFFFFF' },
    { color: 'Blue', hexCode: '#0000FF' },
  ]

describe("ColorsList component", () => {
    it("renders a list of all colors", () =>{
        render(
            <MemoryRouter>
                <ColorsList colors = {initialColors} />
            </MemoryRouter>
        )
        expect(screen.getByText('Red')).toBeInTheDocument();
        expect(screen.getByText('White')).toBeInTheDocument();
        expect(screen.getByText('Blue')).toBeInTheDocument();
    })
})