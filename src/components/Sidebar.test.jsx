import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ currentUser: { displayName: 'Test User', roleLabel: 'Operations' }, signOut: vi.fn() })
}));
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}));

describe('Sidebar', () => {
  it('renders logo text and user info', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(screen.getByText('StadiumMind')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });
});
