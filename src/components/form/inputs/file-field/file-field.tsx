import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type FileFieldProps<FormValues extends FieldValues> = {
  id: Path<FormValues>;
  label: string;
  error?: string;
  required?: boolean;
  register?: UseFormRegister<FormValues>;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function FileField<FormValues extends FieldValues>(
  props: FileFieldProps<FormValues>
) {
  const {
    id,
    label,
    error,
    required = false,
    register,
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
        type="file"
        accept="image/png, image/jpeg"
        {...(register ? register(id) : {})}
        {...rest}
        className="block w-full text-sm text-[var(--color-base-content)] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-primary)] file:text-[var(--color-base-content)] cursor-pointer"
      />
      <p className="text-[var(--color-error-content)] mt-1 min-h-[1.25rem] text-base">
        {error || '\u00A0'}
      </p>
    </div>
  );
}
