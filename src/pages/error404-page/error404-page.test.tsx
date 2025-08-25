import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ERROR404 } from '../../types/types';
import { Error404Page } from './error404-page';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({
      children,
      to,
    }: import('react').PropsWithChildren<{ to: string }>) => (
      <a href={to}>{children}</a>
    ),
  };
});

describe('Error404Page', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockNavigate.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders titles and messages', () => {
    render(
      <MemoryRouter>
        <Error404Page />
      </MemoryRouter>
    );

    expect(screen.getByText(ERROR404.TITLE)).toBeInTheDocument();
    expect(screen.getByText(ERROR404.REDIRECT_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText(ERROR404.LINK_TEXT)).toBeInTheDocument();
  });

  it('renders link to home', () => {
    render(
      <MemoryRouter>
        <Error404Page />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: ERROR404.LINK_TEXT });
    expect(link).toHaveAttribute('href', '/');
  });

  it('navigates to home after timeout', () => {
    render(
      <MemoryRouter>
        <Error404Page />
      </MemoryRouter>
    );

    vi.advanceTimersByTime(ERROR404.TIMEOUT_MS);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
