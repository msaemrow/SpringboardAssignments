import React from 'react';
import {render} from '@testing-library/react'
import App from './App';
import { describe, it, expect } from 'vitest'
import Carousel from './Carousel';

describe('render app', () => {
    it("renders App without crashing", () => {
        render(<App />);
    });
})