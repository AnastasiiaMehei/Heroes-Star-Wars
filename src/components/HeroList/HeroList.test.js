import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HeroList from './HeroList';

const mockHeroes = [
  {
    name: 'Luke Skywalker',
    url: 'https://swapi.dev/api/people/1/',
    imageUrl: 'https://starwars-visualguide.com/assets/img/characters/1.jpg',
  },
];

// Create a mock adapter for axios
const mock = new MockAdapter(axios);

// Mock API requests
mock.onGet('https://swapi.dev/api/people/?page=1').reply(200, {
  results: mockHeroes,
});

test('renders HeroList component', async () => {
  const onSelectHero = jest.fn();
  await act(async () => {
    render(<HeroList onSelectHero={onSelectHero} />);
  });

  // check if the component renders correctly
  await waitFor(() =>
    expect(screen.getByText('Load More')).toBeInTheDocument(),
  );
});

test('calls onSelectHero when a hero is clicked', async () => {
  const onSelectHero = jest.fn();
  await act(async () => {
    render(<HeroList onSelectHero={onSelectHero} />);
  });

  // simulate clicking on a hero
  fireEvent.click(screen.getByText('Luke Skywalker'));

  // check if the onSelectHero function is called
  await waitFor(() => expect(onSelectHero).toHaveBeenCalledWith(mockHeroes[0]));
});
