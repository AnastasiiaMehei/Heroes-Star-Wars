import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeroList from '../HeroList';

test('renders HeroList component', () => {
  const onSelectHero = jest.fn();
  render(<HeroList onSelectHero={onSelectHero} />);

  // check if the component renders correctly
  expect(screen.getByText('Load More')).toBeInTheDocument();
});

test('calls onSelectHero when a hero is clicked', () => {
  const onSelectHero = jest.fn();
  const heroes = [
    { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
  ];
  render(<HeroList onSelectHero={onSelectHero} />);

  // simulate clicking on a hero
  fireEvent.click(screen.getByText('Luke Skywalker'));

  // check if the onSelectHero function is called
  expect(onSelectHero).toHaveBeenCalledWith(heroes[0]);
});
