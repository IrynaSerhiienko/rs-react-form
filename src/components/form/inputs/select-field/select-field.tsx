import clsx from 'clsx';
import type { InputHTMLAttributes, RefObject } from 'react';

interface SelectFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  options: string[];
  error?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export function SelectField(props: SelectFieldProps) {
  const {
    id,
    label,
    options,
    error,
    inputRef,
    required = false,
    className,
    ...rest
  } = props;
  return (
    <div className={clsx('flex flex-col mb-4 text-base md:text-lg', className)}>
      <label
        htmlFor={id}
        className="block font-medium text-[var(--color-base-content)] mb-1"
      >
        {label}{' '}
        {required && (
          <span className="text-[var(--color-error-content)]">*</span>
        )}
      </label>

      <input
        id={id}
        list={`${id}-list`}
        ref={inputRef}
        {...rest}
        className="block w-full rounded border border-[var(--color-base-300)] bg-[var(--color-base-100)]
                   py-2 px-3 text-[var(--color-base-content)] focus:outline-none
                   focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer"
      />
      <datalist id={`${id}-list`}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>

      <p className="text-[var(--color-error-content)] mt-1 min-h-[1.25rem] text-base">
        {error || '\u00A0'}
      </p>
    </div>
  );
}
