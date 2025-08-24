import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

import { INPUT_TYPE } from '../../../../types/types';

type InputType = (typeof INPUT_TYPE)[keyof typeof INPUT_TYPE];

type TextFieldProps = {
  id: string;
  label: string;
  type?: InputType;
  error?: string;
  required?: boolean;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField(props: TextFieldProps) {
  const {
    id,
    label,
    type = INPUT_TYPE.TEXT,
    error,
    required = false,
    className,
    ...rest
  } = props;

  const baseClass =
    'w-full px-3 py-2 border border-[var(--color-base-300)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] disabled:bg-[var(--color-base-200)]';
  const classInput = clsx(
    baseClass,
    error ? 'border-red-500' : 'border-gray-300',
    className
  );

  return (
    <div className="flex flex-col text-base md:text-lg">
      <label
        htmlFor={id}
        className="block font-medium text-[var(--color-base-content)] mb-1"
      >
        {label}{' '}
        {required && (
          <span className="text-[var(--color-error-content)]">*</span>
        )}
      </label>
      <input id={id} type={type} className={classInput} {...rest} />
      <p className="text-[var(--color-error-content)] mt-1 min-h-[1.25rem] text-base">
        {error || '\u00A0'}
      </p>
    </div>
  );
}
