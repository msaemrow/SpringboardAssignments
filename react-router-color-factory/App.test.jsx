import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from "./src/App";

const initialColors = [
    { color: 'Red', hexCode: '#FF0000' },
    { color: 'White', hexCode: '#FFFFFF' },
    { color: 'Blue', hexCode: '#0000FF' },
  ]

describe("App component", () => {
    it("renders home page with colors list", () => {
        render(
            <MemoryRouter>
                <App colors={initialColors} />
            </MemoryRouter>
        )

        expect(screen.getByText('Colors')).toBeInTheDocument();

    })
})