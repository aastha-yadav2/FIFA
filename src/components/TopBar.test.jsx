import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import TopBar from './TopBar';

describe('TopBar', () => {
  it('renders title correctly fallback', () => {
    render(
      <BrowserRouter>
        <TopBar />
      </BrowserRouter>
    );
    expect(screen.getByText('StadiumMind AI')).toBeInTheDocument();
  });
  
  it('renders security status', () => {
    render(
      <BrowserRouter>
        <TopBar />
      </BrowserRouter>
    );
    expect(screen.getByText('GREEN')).toBeInTheDocument();
  });
});
