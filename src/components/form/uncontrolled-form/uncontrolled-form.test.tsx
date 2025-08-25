import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UncontrolledForm } from './uncontrolled-form.tsx';

vi.mock('../../../store/hooks/use-countries', () => ({
  useCountries: () => ({
    countries: ['Ukraine', 'Poland'],
  }),
}));

vi.mock('../../../store/hooks/use-forms', () => ({
  useForms: () => ({
    addUncontrolledFormData: vi.fn(),
  }),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('UncontrolledForm', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <UncontrolledForm />
      </BrowserRouter>
    );
  });

  it('renders Name field', async () => {
    expect(await screen.findByLabelText(/Name/i)).toBeInTheDocument();
  });
  it('renders Age field', async () => {
    expect(await screen.findByLabelText(/Age/i)).toBeInTheDocument();
  });

  it('renders Email field', async () => {
    expect(await screen.findByLabelText(/Email/i)).toBeInTheDocument();
  });

  it('renders Country field', async () => {
    expect(await screen.findByLabelText(/Country/i)).toBeInTheDocument();
  });

  it('renders Accept Terms checkbox', async () => {
    expect(await screen.findByLabelText(/Accept Terms/i)).toBeInTheDocument();
  });

  it('renders Upload Picture field', async () => {
    expect(await screen.findByLabelText(/Upload Picture/i)).toBeInTheDocument();
  });

  it('renders Submit button', async () => {
    expect(
      await screen.findByRole('button', { name: /Submit/i })
    ).toBeInTheDocument();
  });
  it('shows validation errors on empty submit', async () => {
    const user = userEvent.setup();
    const submitButton = await screen.findByRole('button', { name: /Submit/i });
    await user.click(submitButton);

    expect(await screen.findByText(/required/i)).toBeInTheDocument();
  });
});
