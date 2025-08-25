import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import App from './App';
import { store } from './store';
import { HOME_PAGE } from './types/types';

describe('App', () => {
  it('renders without crashing and shows HomePage', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(HOME_PAGE.TITLE)).toBeInTheDocument();
  });
});
