import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HeroGraph from './HeroGraph';

const mockHero = {
  name: 'Luke Skywalker',
  url: 'https://swapi.dev/api/people/1/',
  films: [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/2/',
    'https://swapi.dev/api/films/3/',
  ],
};

const mockFilms = [
  { title: 'A New Hope', url: 'https://swapi.dev/api/films/1/', starships: [] },
  {
    title: 'The Empire Strikes Back',
    url: 'https://swapi.dev/api/films/2/',
    starships: [],
  },
  {
    title: 'Return of the Jedi',
    url: 'https://swapi.dev/api/films/3/',
    starships: [],
  },
];

// Create a mock adapter for axios
const mock = new MockAdapter(axios);

// Mock API requests
mock.onGet('https://swapi.dev/api/people/1/').reply(200, mockHero);
mock.onGet('https://swapi.dev/api/films/1/').reply(200, mockFilms[0]);
mock.onGet('https://swapi.dev/api/films/2/').reply(200, mockFilms[1]);
mock.onGet('https://swapi.dev/api/films/3/').reply(200, mockFilms[2]);

test('renders HeroGraph component', async () => {
  await act(async () => {
    render(<HeroGraph hero={mockHero} />);
  });
  const element = await waitFor(() => screen.getByText(/Luke Skywalker/i));
  expect(element).toBeInTheDocument();
});
