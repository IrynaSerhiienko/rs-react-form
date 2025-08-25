import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CheckboxField } from './checkbox-field';

describe('CheckboxField', () => {
  it('renders label and checkbox input', () => {
    render(<CheckboxField id="accept" label="Accept Terms" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
  });

  it('renders error message if provided', () => {
    render(<CheckboxField id="accept" label="Accept Terms" error="Required" />);

    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });

  it('calls onChange handler when clicked', () => {
    const handleChange = vi.fn();
    render(
      <CheckboxField id="accept" label="Accept Terms" onChange={handleChange} />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalled();
  });

  it('can be checked and unchecked', () => {
    render(<CheckboxField id="accept" label="Accept Terms" />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
