import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AssistantWidget from '../src/components/layout/AssistantWidget';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import React from 'react';

global.fetch = vi.fn();

describe('AssistantWidget', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders the open button initially', () => {
    render(<AssistantWidget />);
    expect(screen.getByRole('button', { name: 'Open AI Assistant' })).toBeInTheDocument();
  });

  it('opens chat window on click', () => {
    render(<AssistantWidget />);
    const openBtn = screen.getByRole('button', { name: 'Open AI Assistant' });
    fireEvent.click(openBtn);
    expect(screen.getByText('Hi! I am the GenAI Stadium Assistant. How can I help?')).toBeInTheDocument();
  });

  it('sends a message and displays the response', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ success: true, message: 'Navigating to Gate C' }),
    });

    render(<AssistantWidget />);
    const openBtn = screen.getByRole('button', { name: 'Open AI Assistant' });
    fireEvent.click(openBtn);
    
    const input = screen.getByPlaceholderText('Ask about navigation, crowds...');
    const sendButton = screen.getByRole('button', { name: 'Send' });

    fireEvent.change(input, { target: { value: 'Where is my seat?' } });
    fireEvent.click(sendButton);

    expect(fetch).toHaveBeenCalledWith('/api/assistant', expect.any(Object));

    await waitFor(() => {
      expect(screen.getByText('Navigating to Gate C')).toBeInTheDocument();
    });
  });

  it('handles fetch errors gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<AssistantWidget />);
    const openBtn = screen.getByRole('button', { name: 'Open AI Assistant' });
    fireEvent.click(openBtn);
    
    const input = screen.getByPlaceholderText('Ask about navigation, crowds...');
    const sendButton = screen.getByRole('button', { name: 'Send' });

    fireEvent.change(input, { target: { value: 'Where is my seat?' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Connection failed.')).toBeInTheDocument();
    });
  });
});
