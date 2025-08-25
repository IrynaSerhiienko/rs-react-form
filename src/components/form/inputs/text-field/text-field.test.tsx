import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { INPUT_TYPE } from '../../../../types/types';
import { TextField } from './text-field';

describe('TextField', () => {
  it('renders label and input', () => {
    render(<TextField id="name" label="Name" />);

    const input = screen.getByLabelText(/name/i) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe(INPUT_TYPE.TEXT);
  });

  it('renders error text if provided', () => {
    render(<TextField id="email" label="Email" error="Required" />);

    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TextField id="age" label="Age" className="custom-class" />);

    const input = screen.getByLabelText(/age/i);
    expect(input).toHaveClass('custom-class');
  });

  it('renders required asterisk if required', () => {
    render(<TextField id="username" label="Username" required />);

    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
