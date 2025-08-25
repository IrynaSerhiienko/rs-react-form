import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { ROUTE_LABELS, ROUTES } from '../../types/types';
import { Header } from './header';

describe('Header', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('contains navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(ROUTE_LABELS.HOME)).toBeInTheDocument();
    expect(screen.getByText(ROUTE_LABELS.REGISTER)).toBeInTheDocument();
  });

  it('activates Home link on "/" route', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.HOME]}>
        <Header />
      </MemoryRouter>
    );
    const homeLink = screen.getByText(ROUTE_LABELS.HOME);
    expect(homeLink.className).toMatch(/font-semibold/);
  });

  it('activates Register link on "/register" route', () => {
    render(
      <MemoryRouter initialEntries={[`/${ROUTES.REGISTER}`]}>
        <Header />
      </MemoryRouter>
    );
    const registerLink = screen.getByText(ROUTE_LABELS.REGISTER);
    expect(registerLink.className).toMatch(/font-semibold/);
  });

  it('renders FileText icon', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });
});
