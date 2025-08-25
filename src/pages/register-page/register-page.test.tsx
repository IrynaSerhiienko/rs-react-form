import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RegisterPage } from './register-page';

vi.mock('../../components/modal/modal', () => ({
  Modal: () => <div data-testid="modal">Mock Modal</div>,
}));

describe('RegisterPage', () => {
  it('renders without crashing', () => {
    render(<RegisterPage />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('renders Modal component', () => {
    render(<RegisterPage />);
    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent('Mock Modal');
  });
});
