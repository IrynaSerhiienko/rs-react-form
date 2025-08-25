import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ReactHookForm } from './react-hook-form.tsx';

vi.mock('../../../store/hooks/use-countries', () => ({
  useCountries: () => ({
    countries: ['Ukraine', 'Poland'],
  }),
}));

vi.mock('../../../store/hooks/use-forms', () => ({
  useForms: () => ({
    addReactHookFormData: vi.fn(),
  }),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('ReactHookForm', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ReactHookForm />
      </BrowserRouter>
    );
  });

  it('renders Name field', () => {
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  });
  it('renders Submit button and it is disabled initially', () => {
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
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
});
