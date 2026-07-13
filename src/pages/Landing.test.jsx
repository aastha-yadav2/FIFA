import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Landing from './Landing';

describe('Landing Page', () => {
  it('renders landing page hero text', () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );
    expect(screen.getByText(/Platform Ever Built/i)).toBeInTheDocument();
    expect(screen.getAllByText(/FIFA World Cup 2026/i).length).toBeGreaterThan(0);
  });
});
