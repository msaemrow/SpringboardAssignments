import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import { describe, vi, it, expect } from "vitest";
import AddColorForm from "./src/components/AddColorForm";
import ColorsList from "./src/components/ColorsList";

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useNavigate: vi.fn(),
    };
  });

describe('AddColorForm Component', () => {
    it('renders the form correctly', () => {
        render(
            <MemoryRouter initialEntries={['/colors/new']}>
                <Routes>
                    <Route path="/colors/new" element={<AddColorForm addColor={vi.fn()} />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Add a new color')).toBeInTheDocument();
        expect(screen.getByText('Name Color:')).toBeInTheDocument();
        expect(screen.getByText('Hex Code:')).toBeInTheDocument();
    });

    it('handles input changes', () => {
        render(
            <MemoryRouter initialEntries={['/colors/new']}>
                <Routes>
                    <Route path="/colors/new" element={<AddColorForm addColor={vi.fn()} />} />
                </Routes>
            </MemoryRouter>
        );

        const colorInput = screen.getByLabelText('Name Color:');
        const hexCodeInput = screen.getByLabelText('Hex Code:');

        fireEvent.change(colorInput, {target: {value: 'Green'}});
        fireEvent.change(hexCodeInput, {target: {value: '#00ff00'}});

        expect(colorInput.value).toBe('Green');
        expect(hexCodeInput.value).toBe('#00ff00')
    });

    it('submits the form', () => {
        const mockAddColor = vi.fn();
        const mockNavigate = vi.fn();
    
        // Update the mock implementation to return the mockNavigate
        vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    
        render(
          <MemoryRouter initialEntries={['/colors/new']}>
            <Routes>
              <Route path="/colors/new" element={<AddColorForm addColor={mockAddColor} />} />
            </Routes>
          </MemoryRouter>
        );
    
        const colorInput = screen.getByLabelText('Name Color:');
        const hexCodeInput = screen.getByLabelText('Hex Code:');
        const submitButton = screen.getByRole('button', { name: /submit/i });
    
        fireEvent.change(colorInput, { target: { value: 'Green' } });
        fireEvent.change(hexCodeInput, { target: { value: '#00FF00' } });
        fireEvent.click(submitButton);
    
        expect(mockAddColor).toHaveBeenCalledWith({ color: 'Green', hexCode: '#00ff00' });
        expect(colorInput.value).toBe('');
        expect(hexCodeInput.value).toBe('#000000');
        expect(mockNavigate).toHaveBeenCalledWith('/colors');
      });
})