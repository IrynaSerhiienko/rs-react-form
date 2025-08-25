import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Modal } from './modal';

describe('Modal', () => {
  it('renders modal when open', () => {
    render(<Modal />);
    expect(screen.getByText(/Choose form/i)).toBeInTheDocument();
  });
  it('closes modal when Close button is clicked', async () => {
    render(<Modal />);
    const closeButton = screen.getByLabelText(/Close/i);

    await userEvent.click(closeButton);

    expect(screen.queryByText(/Choose form/i)).not.toBeInTheDocument();
  });
  it('closes modal when Escape key is pressed', async () => {
    render(<Modal />);
    expect(screen.getByText(/Choose form/i)).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    expect(screen.queryByText(/Choose form/i)).not.toBeInTheDocument();
  });
});
