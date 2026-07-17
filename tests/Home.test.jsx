import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';
import { expect, test, describe, vi } from 'vitest';
import React from 'react';

// Mock LiquidBackground to avoid three.js/canvas issues in JSDOM
vi.mock('../src/components/ui/LiquidBackground', () => ({
  default: () => <div data-testid="liquid-background-mock"></div>
}));

describe('Home Page', () => {
  test('renders the hero section correctly', () => {
    render(<Home />);
    expect(screen.getByText('Quarter-final, Match 98')).toBeInTheDocument();
    expect(screen.getByText(/Updates from the quarter-final in Los Angeles/i)).toBeInTheDocument();
  });

  test('renders story bubbles with emojis', () => {
    render(<Home />);
    const storyBubble = screen.getByLabelText('ESP 2-1 BEL');
    expect(storyBubble).toBeInTheDocument();
    expect(storyBubble.textContent).toBe('🇪🇸');
  });

  test('renders top stories section', () => {
    render(<Home />);
    expect(screen.getByText('Tournament News')).toBeInTheDocument();
    expect(screen.getByText(/Record attendance expected/i)).toBeInTheDocument();
  });
});
