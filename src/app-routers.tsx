import { Route, Routes } from 'react-router-dom';

import { AppLayout } from './components/layout/layout';
import { Error404Page } from './pages/error404-page/error404-page';
import { HomePage } from './pages/home-page/home-page';
import { RegisterPage } from './pages/register-page/register-page';
import { ROUTES } from './types/types';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.Error404Page} element={<Error404Page />} />
      </Route>
    </Routes>
  );
}
