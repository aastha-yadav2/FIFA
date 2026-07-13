import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ChartCard from './ChartCard';

describe('ChartCard', () => {
  it('renders title and subtitle correctly', () => {
    render(<ChartCard title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <ChartCard title="Chart">
        <div data-testid="child">Child Content</div>
      </ChartCard>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
