import { Outlet } from 'react-router-dom';

import { Header } from '../header/header';
import { LimitContainer } from '../limit-container/limit-container';

export function AppLayout() {
  return (
    <div
      className="min-h-screen flex flex-col text-sm md:text-base 
      bg-[var(--color-base-100)] dark:bg-[var(--color-neutral)] 
      text-[var(--color-base-content)] dark:text-[var(--color-base-100)]"
    >
      <Header />
      <main className="pt-[120px]">
        <LimitContainer>
          <Outlet />
        </LimitContainer>
      </main>
    </div>
  );
}
