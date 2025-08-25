import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ACCEPT_TERMS, INPUT_LABEL } from '../../types/types';
import { Card } from './card';

const mockProps = {
  id: '1',
  name: 'John Doe',
  age: 30,
  country: 'USA',
  gender: 'Male',
  email: 'john@example.com',
  password: 'secret123',
  acceptTerms: true,
  picture: null,
};

describe('Card', () => {
  it('renders without crashing', () => {
    render(<Card {...mockProps} />);
    expect(screen.getByText(`${INPUT_LABEL.NAME}:`)).toBeInTheDocument();
  });

  it('renders all fields correctly', () => {
    render(<Card {...mockProps} />);
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/30/)).toBeInTheDocument();
    expect(screen.getByText(/USA/)).toBeInTheDocument();
    expect(screen.getByText(/Male/)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/)).toBeInTheDocument();
    expect(screen.getByText(ACCEPT_TERMS.YES)).toBeInTheDocument();
    expect(screen.getByText(/\*+/)).toBeInTheDocument();
  });

  it('renders picture when provided', () => {
    render(<Card {...mockProps} picture="test.jpg" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('alt', 'John Doe');
  });

  it('does not render picture when not provided', () => {
    render(<Card {...mockProps} />);
    const img = screen.queryByRole('img');
    expect(img).toBeNull();
  });
});
