import { render, screen, waitFor } from '@testing-library/react';
import ProfilePage from '../src/app/profile/page';
import { useSession } from 'next-auth/react';
import { vi, describe, it, expect } from 'vitest';
import React from 'react';

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
  signOut: vi.fn()
}));

global.fetch = vi.fn();

describe('ProfilePage', () => {
  it('renders nothing if no session', () => {
    useSession.mockReturnValue({ data: null });
    const { container } = render(<ProfilePage />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders user details if session exists', async () => {
    const mockUser = { name: 'Raja', email: 'raja@example.com', role: 'fan' };
    useSession.mockReturnValue({ data: { user: mockUser } });
    
    fetch.mockResolvedValueOnce({
      json: async () => ({ user: mockUser })
    });

    render(<ProfilePage />);

    expect(screen.getByText('Raja')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/profile');
    });
  });
});
