import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { CardProps } from '../../types/types';
import { HOME_PAGE, ROUTES } from '../../types/types';
import { HomePage } from './home-page';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockForms = {
  reactHookForm: [
    {
      id: '1',
      name: 'Alice',
      age: 25,
      country: 'USA',
      gender: 'Female',
      email: 'a@test.com',
      password: '123',
      acceptTerms: true,
      picture: null,
    },
  ],
  uncontrolledForm: [
    {
      id: '2',
      name: 'Bob',
      age: 30,
      country: 'UK',
      gender: 'Male',
      email: 'b@test.com',
      password: '456',
      acceptTerms: false,
      picture: null,
    },
  ],
  lastAddedId: '2',
};

vi.mock('../../store/hooks/use-forms', () => ({
  useForms: () => mockForms,
}));

vi.mock('../../components/card/card', () => ({
  Card: (props: CardProps) => (
    <div data-testid={`card-${props.id}`}>{props.name}</div>
  ),
}));

describe('HomePage', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('renders title and register text', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(HOME_PAGE.TITLE)).toBeInTheDocument();

    const registerParagraph = screen
      .getByText(HOME_PAGE.REGISTER_LINK)
      .closest('p');
    expect(registerParagraph).toBeInTheDocument();
  });

  it('navigates to register page on click', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const registerParagraph =
      screen.getByRole('paragraph', { hidden: true }) ||
      screen.getByText(/register/i);

    fireEvent.click(registerParagraph);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.REGISTER);
  });

  it('renders cards for each form', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('card-1')).toHaveTextContent('Alice');
    expect(screen.getByTestId('card-2')).toHaveTextContent('Bob');
  });
});
