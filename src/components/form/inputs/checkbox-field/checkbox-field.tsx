import type { InputHTMLAttributes, RefObject } from 'react';

interface CheckboxFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export function CheckboxField(props: CheckboxFieldProps) {
  const { id, label, error, inputRef, ...rest } = props;
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <input type="checkbox" id={id} ref={inputRef} {...rest} />
        <label htmlFor={id}>{label}</label>
      </div>
      <p className="text-[var(--color-error-content)] mt-1 min-h-[1.25rem] text-base">
        {error || '\u00A0'}
      </p>
    </div>
  );
}
