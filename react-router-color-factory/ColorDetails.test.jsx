import React from "react";
import {render, screen} from '@testing-library/react'
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ColorDetails from "./src/components/ColorDetails";
import ColorsList from "./src/components/ColorsList";

const initialColors = [
    { color: 'Red', hexCode: '#FF0000' },
    { color: 'White', hexCode: '#FFFFFF' },
    { color: 'Blue', hexCode: '#0000FF' },
  ]

describe("ColorDetails component", () => {
    it("renders details for a specific color", () => {
        render(
            <MemoryRouter initialEntries={['/colors/Red']}>
                <Routes>
                    <Route path="colors/:color" element={<ColorDetails colors={initialColors} />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Red')).toBeInTheDocument();
        expect(screen.getByText('Hex Code: #FF0000')).toBeInTheDocument();
        expect(screen.getByText('Return to all colors')).toBeInTheDocument();
    });

    it("redirects to all colors page for unknown color", () => {
        render(
            <MemoryRouter initialEntries={['/colors/Purple']}>
                <Routes>
                    <Route path="colors/:color" element={<ColorDetails colors={initialColors} />} />
                    <Route path="/colors" element={<ColorsList colors={initialColors} />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.queryByText('Purple')).not.toBeInTheDocument();
        expect(screen.getByText('Colors')).toBeInTheDocument();
    })
})


