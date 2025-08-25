import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { INPUT_TYPE } from '../../../../types/types';

type RadioOption = {
  label: string;
  value: string;
};

type RadioFieldProps<FormValues extends FieldValues> = {
  id: Path<FormValues>;
  label: string;
  options: RadioOption[];
  error?: string;
  className?: string;
  required?: boolean;
  register?: UseFormRegister<FormValues>;
} & InputHTMLAttributes<HTMLInputElement>;

export function RadioField<FormValues extends FieldValues>({
  id,
  label,
  options,
  error,
  required = false,
  className,
  register,
  ...rest
}: RadioFieldProps<FormValues>) {
  return (
    <div className={clsx('flex flex-col mb-4 text-base md:text-lg', className)}>
      <p className="block font-medium text-[var(--color-base-content)] mb-1">
        {label}{' '}
        {required && (
          <span className="text-[var(--color-error-content)]">*</span>
        )}
      </p>
      <div className="flex gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type={INPUT_TYPE.RADIO}
              {...(register ? register(id) : {})}
              value={option.value}
              className="accent-[var(--color-primary)]"
              {...rest}
            />
            {option.label}
          </label>
        ))}
      </div>
      <p className="text-[var(--color-error-content)] text-sm mt-1 min-h-[1.25rem]">
        {error || '\u00A0'}
      </p>
    </div>
  );
}
