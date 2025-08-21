import { FileText } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { LimitContainer } from '../limit-container/limit-container';

const navItems = [{ to: '/', label: 'Home', end: true }];

export function Header() {
  const activeClass = 'text-[var(--color-primary)] font-semibold underline';
  const inactiveClass =
    'text-[var(--color-neutral-content)] hover:text-[var(--color-primary)] hover:underline';
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? activeClass : inactiveClass;

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full py-4 shadow-md 
      bg-[var(--color-base-100)] dark:bg-[var(--color-neutral)] 
      text-[var(--color-base-content)] dark:text-[var(--color-base-100)]"
    >
      <LimitContainer className="flex-row items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-4">
          <FileText color="var(--color-primary)" size={34} />
        </NavLink>
        <div className="flex gap-7">
          {navItems.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </div>
      </LimitContainer>
    </header>
  );
}
