import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import KPICard from './KPICard';
import { Activity } from 'lucide-react';

describe('KPICard', () => {
  it('renders label and value correctly', () => {
    render(<KPICard label="Total Fans" value="10,000" />);
    expect(screen.getByText('Total Fans')).toBeInTheDocument();
    expect(screen.getByText('10,000')).toBeInTheDocument();
  });

  it('renders unit correctly', () => {
    render(<KPICard label="Capacity" value="95" unit="%" />);
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('renders icon and change appropriately', () => {
    render(<KPICard label="Growth" value="50" change="+5" up={true} icon={Activity} />);
    expect(screen.getByText('+5')).toBeInTheDocument();
  });
});
