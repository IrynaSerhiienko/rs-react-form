import { FileText } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { ROUTE_LABELS, ROUTES } from '../../types/types';
import { LimitContainer } from '../limit-container/limit-container';

const navItems = [
  { to: ROUTES.HOME, label: ROUTE_LABELS.HOME, end: true },
  { to: `/${ROUTES.REGISTER}`, label: ROUTE_LABELS.REGISTER, end: false },
] as const;

export function Header() {
  const navUnderline = `relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-current after:duration-500`;
  const activeClass = `${navUnderline} font-semibold after:w-full`;
  const inactiveClass = `${navUnderline} text-[var(--color-neutral-content)] after:w-0 hover:after:w-full`;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? activeClass : inactiveClass;

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full py-4 shadow-md 
      bg-[var(--color-base-100)] dark:bg-[var(--color-neutral)] 
      text-[var(--color-base-content)] dark:text-[var(--color-base-100)] text-base md:text-lg"
    >
      <LimitContainer className="flex-row items-center justify-between">
        <NavLink to={ROUTES.HOME} className="flex items-center space-x-4">
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
