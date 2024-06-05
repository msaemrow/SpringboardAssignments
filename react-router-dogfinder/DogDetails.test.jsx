import React from "react";
import {render, screen} from '@testing-library/react'
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import DogDetails from "./src/components/DogDetails";
import DogList from "./src/components/DogList";

const defaultDogs = [
    {
      name: "Whiskey",
      age: 5,
      src: "https://media.indiedb.com/images/members/1/361/360683/random_dog.jpg",
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!"
      ]
    }
];

describe("DogDetails component", () => {
    it("renders details for a specific dog", () => {
        render(
        <MemoryRouter initialEntries={['/dogs/Whiskey']}>
            <Routes>
                <Route path="/dogs/:name" element={<DogDetails dogs={defaultDogs} />} />
            </Routes>
        </MemoryRouter>);

        expect(screen.getByText('Details about Whiskey')).toBeInTheDocument();
        expect(screen.getByText('Age: 5')).toBeInTheDocument();
    });

    it("redirects to /dogs for an unknown dog", () => {
        render(
            <MemoryRouter initialEntries={['/dogs/Yankee']}>
                <Routes>
                    <Route path="/dogs/:name" element={<DogDetails dogs={defaultDogs} />} />
                    <Route path="/dogs" element={<DogList dogs={defaultDogs} />} />
                </Routes>
            </MemoryRouter>);

    expect(screen.queryByText('Details about Yankee')).not.toBeInTheDocument();
    expect(screen.getByText('Dogs')).toBeInTheDocument();
    })
})