import { render, screen } from '@testing-library/react';
import Footer from '../src/components/layout/Footer';
import { expect, test, describe } from 'vitest';
import React from 'react';

describe('Footer Component', () => {
  test('renders all columns', () => {
    render(<Footer />);
    expect(screen.getByText('FIFA World Cup 2026™')).toBeInTheDocument();
    expect(screen.getByText('FIFA Tournaments')).toBeInTheDocument();
    expect(screen.getByText('About FIFA')).toBeInTheDocument();
    expect(screen.getByText('FIFA Platforms')).toBeInTheDocument();
  });

  test('renders copyright notice', () => {
    render(<Footer />);
    expect(screen.getByText(/© FIFA 2026. All rights reserved/i)).toBeInTheDocument();
  });
});
