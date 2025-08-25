import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import AppRoutes from './app-routers';
import { store } from './store';
import { HOME_PAGE, MODAL, ROUTES } from './types/types';

describe('AppRoutes', () => {
  it('renders HomePage on default route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTES.HOME]}>
          <AppRoutes />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(HOME_PAGE.TITLE)).toBeInTheDocument();
  });

  it('renders RegisterPage on /register route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/register']}>
          <AppRoutes />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(MODAL.TITLE)).toBeInTheDocument();
    expect(screen.getByText(MODAL.FORMS.UNCONTROLLED)).toBeInTheDocument();
    expect(screen.getByText(MODAL.FORMS.REACT_HOOK_FORM)).toBeInTheDocument();
  });

  it('renders Error404Page on unknown route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown']}>
          <AppRoutes />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
