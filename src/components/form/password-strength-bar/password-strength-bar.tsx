import clsx from 'clsx';

const PASSWORD_STRENGTH = {
  NONE: 0,
  WEAK: 1,
  FAIR: 2,
  GOOD: 3,
  STRONG: 4,
  VERY_STRONG: 5,
} as const;

const PASSWORD_BAR_COLORS = {
  LOW: 'bg-[var(--color-error)]',
  MEDIUM: 'bg-[var(--color-warning)]',
  HIGH: 'bg-[var(--color-success)]',
} as const;

type PasswordRules = {
  minLength: boolean;
  upper: boolean;
  lower: boolean;
  number: boolean;
  special: boolean;
};

type PasswordStrengthBarProps = {
  rules: PasswordRules;
};

export const PasswordStrengthBar = ({ rules }: PasswordStrengthBarProps) => {
  const strength = Object.values(rules).filter(Boolean).length;

  const barColor =
    strength <= PASSWORD_STRENGTH.FAIR
      ? PASSWORD_BAR_COLORS.LOW
      : strength <= PASSWORD_STRENGTH.STRONG
        ? PASSWORD_BAR_COLORS.MEDIUM
        : PASSWORD_BAR_COLORS.HIGH;

  const widthClass = clsx({
    'w-0': strength === PASSWORD_STRENGTH.NONE,
    'w-1/5': strength === PASSWORD_STRENGTH.WEAK,
    'w-2/5': strength === PASSWORD_STRENGTH.FAIR,
    'w-3/5': strength === PASSWORD_STRENGTH.GOOD,
    'w-4/5': strength === PASSWORD_STRENGTH.STRONG,
    'w-full': strength === PASSWORD_STRENGTH.VERY_STRONG,
  });

  return (
    <div className="w-full h-2 bg-[var(--color-base-200)] rounded mt-2">
      <div
        className={clsx('h-2 rounded transition-all', barColor, widthClass)}
      />
    </div>
  );
};
