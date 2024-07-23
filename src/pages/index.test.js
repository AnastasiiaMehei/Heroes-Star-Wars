import React from 'react';
import { render, screen } from '@testing-library/react';
import Index from './index';

test('renders index page', () => {
  render(<Index />);
  const element = screen.getByText(/Star Wars Heroes/i);
  expect(element).toBeInTheDocument();
});
