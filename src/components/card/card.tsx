import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { ACCEPT_TERMS, INPUT_LABEL } from '../../types/types';

type CardProps = {
  id: string;
  name: string;
  age: number;
  country: string;
  gender: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  picture: string | null;
  isNew?: boolean;
};

export function Card(props: CardProps) {
  const {
    id,
    name,
    age,
    country,
    gender,
    email,
    password,
    acceptTerms,
    picture,
    isNew,
  } = props;
  const [highlight, setHighlight] = useState(true);

  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setHighlight(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  const cardClasses = clsx(
    'rounded shadow-xl p-4 transition-colors duration-500 text-[var(--color-base-content)] flex flex-col gap-2 text-base md:text-lg',
    highlight ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-base-300)]'
  );

  return (
    <div id={`card-${id}`} className={cardClasses}>
      <div className="w-40 h-40 x-auto mb-4 overflow-hidden rounded-full bg-[var(--color-neutral)]">
        {picture ? (
          <img
            src={picture}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>

      <p>
        <strong>{INPUT_LABEL.NAME}:</strong> {name}
      </p>
      <p>
        <strong>{INPUT_LABEL.AGE}:</strong> {age}
      </p>
      <p>
        <strong>{INPUT_LABEL.COUNTRY}:</strong> {country}
      </p>
      <p>
        <strong>{INPUT_LABEL.GENDER}:</strong> {gender}
      </p>
      <p>
        <strong>{INPUT_LABEL.EMAIL}:</strong> {email}
      </p>
      <p>
        <strong>{INPUT_LABEL.ACCEPT_TERMS}:</strong>{' '}
        {acceptTerms ? ACCEPT_TERMS.YES : ACCEPT_TERMS.NO}
      </p>
      <p>
        <strong>{INPUT_LABEL.PASSWORD}:</strong> {password.replace(/./g, '*')}
      </p>
    </div>
  );
}
