import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../src/components/layout/Header';
import { expect, test, describe } from 'vitest';

// Mock lucide-react icons since they can cause issues in jsdom sometimes
// But since they are standard components, it should be fine. If it fails, we will mock them.

describe('Header Component', () => {
  test('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByText('FIFA WORLD CUP 2026™')).toBeInTheDocument();
  });

  test('displays Sign In link when no session', () => {
    render(<Header session={null} />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('displays User name when session exists', () => {
    const mockSession = { user: { name: 'Raja Kushwaha', role: 'admin' } };
    render(<Header session={mockSession} />);
    expect(screen.getByText('Raja')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });

  test('opens search overlay on click', () => {
    render(<Header />);
    const searchButton = screen.getByLabelText('Search');
    fireEvent.click(searchButton);
    expect(screen.getByPlaceholderText(/Search matches/i)).toBeInTheDocument();
  });
});
