import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ERROR404 } from '../../types/types';

export function Error404Page() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, ERROR404.TIMEOUT_MS);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="p-4 font-bold">
      <h1 className="flex justify-center mb-12 text-[var(--color-error-content)] text-2xl md:text-4xl font-bold">
        {ERROR404.TITLE}
      </h1>
      <h2 className="flex justify-center mb-2 text-[var(--color-base-content)] text-xl md:text-2xl font-semibold">
        {ERROR404.REDIRECT_MESSAGE}
      </h2>
      <h3 className="flex justify-center mb-2 text-[var(--color-base-content)] text-lg md:text-xl font-medium">
        Or you can&nbsp;
        <Link to="/" className="text-[var(--color-primary)] underline">
          {ERROR404.LINK_TEXT}
        </Link>
        .
      </h3>
    </div>
  );
}
