import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from "./src/components/App";

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
    },
    {
      name: "Duke",
      age: 3,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8bvuyYj0iRywhtDKZUA8mHwh330nUm-YpdQ&s",
      facts: [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs."
      ]
    },
    {
      name: "Perry",
      age: 4,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF53l_Elv-I20wwOWGeUNltmV0Vd_Jv3t_hw&s",
      facts: [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain."
      ]
    },
    {
      name: "Tubby",
      age: 4,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjZNYkPi7jxsJXTmf23Aaf0sYHzSiXpGVmJw&s",
      facts: [
        "Tubby is really stupid.",
        "Tubby does not like walks.",
        "Angelina used to hate Tubby, but claims not to anymore."
      ]
    }
  ];


describe("App component", () => {
    it("renders home page with dog list", () => {
        render(
            <MemoryRouter>
                <App dogs={defaultDogs} />
            </MemoryRouter>
        )
        
        expect(screen.getByText('Dogs')).toBeInTheDocument();

        //check to see if the dos are in the nav bar and in the body
        const whiskeyAppearances = screen.getAllByText('Whiskey')
        const tubbyAppearances = screen.getAllByText('Tubby')
        expect(whiskeyAppearances.length).toBe(2);
        expect(tubbyAppearances.length).toBe(2);
    })
})