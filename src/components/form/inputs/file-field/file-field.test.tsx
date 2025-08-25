import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FileField } from './file-field';

describe('FileField', () => {
  it('renders label and input', () => {
    render(<FileField id="picture" label="Picture" />);

    expect(screen.getByLabelText(/picture/i)).toBeInTheDocument();
    const input = screen.getByLabelText(/picture/i) as HTMLInputElement;
    expect(input.type).toBe('file');
    expect(input.accept).toBe('image/png, image/jpeg');
  });

  it('renders error text if provided', () => {
    render(<FileField id="picture" label="Picture" error="Required" />);

    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });

  it('calls register function if provided', () => {
    const mockRegister = vi.fn().mockReturnValue({});
    render(<FileField id="picture" label="Picture" register={mockRegister} />);

    expect(mockRegister).toHaveBeenCalledWith('picture');
  });
});
