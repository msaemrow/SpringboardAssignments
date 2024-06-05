import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import DogList from "./src/components/DogList"

const defaultDogs = [
  {
    name: "Whiskey",
    age: 5,
    src: "https://media.indiedb.com/images/members/1/361/360683/random_dog.jpg",
    facts: ["Whiskey loves eating popcorn."]
  },
  {
    name: "Duke",
    age: 3,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8bvuyYj0iRywhtDKZUA8mHwh330nUm-YpdQ&s",
    facts: ["Duke believes that ball is life."]
  }
];

describe("DogList component", () => {
    it("renders a list of dogs", () => {
        render(
            <MemoryRouter>
                <DogList dogs={defaultDogs} />
            </MemoryRouter>
        )

        expect(screen.getByText('Dogs')).toBeInTheDocument();
        expect(screen.getByText('Whiskey')).toBeInTheDocument();
        expect(screen.getByText('Duke')).toBeInTheDocument();
    })
})