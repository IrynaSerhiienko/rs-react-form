import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValidationError as YupValidationError } from 'yup';

import { useCountries } from '../../../store/hooks/use-countries';
import { useForms } from '../../../store/hooks/use-forms';
import {
  BUTTONS,
  BUTTONS_TYPE,
  genderOptions,
  INPUT_LABEL,
  INPUT_NAME,
  INPUT_TYPE,
  ROUTES,
} from '../../../types/types';
import { fileToBase64 } from '../../../utils/file-to-base64';
import { schema } from '../../../utils/form-validation';
import { CheckboxField } from '../inputs/checkbox-field/checkbox-field';
import { SelectField } from '../inputs/select-field/select-field';
import { TextField } from '../inputs/text-field/text-field';

type ValidationErrors = Partial<
  Record<keyof (typeof schema)['fields'], string>
>;

export function UncontrolledForm() {
  const { addUncontrolledFormData } = useForms();
  const navigate = useNavigate();
  const { countries } = useCountries();
  const [errors, setErrors] = useState<ValidationErrors>({});

  const genderRefs: React.RefObject<HTMLInputElement | null>[] =
    genderOptions.map(() => React.createRef<HTMLInputElement>());

  const refs = {
    name: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
    country: useRef<HTMLInputElement>(null),
    acceptTerms: useRef<HTMLInputElement>(null),
    picture: useRef<HTMLInputElement>(null),
  };

  const submitButtonClasses = clsx(
    'px-4 py-2 rounded-md transition-colors duration-500 text-base md:text-lg bg-[var(--color-primary)] text-[var(--color-base-content)] hover:bg-[var(--color-primary-content)] hover:text-[var(--color-base-100)] cursor-pointer'
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formValues = {
      name: refs.name.current?.value || '',
      age: Number(refs.age.current?.value) || 0,
      email: refs.email.current?.value || '',
      password: refs.password.current?.value || '',
      confirmPassword: refs.confirmPassword.current?.value || '',
      gender:
        genderRefs.find((ref) => ref.current?.checked)?.current?.value || '',
      country: refs.country.current?.value || '',
      acceptTerms: refs.acceptTerms.current?.checked || false,
      picture: refs.picture.current?.files || undefined,
    };

    try {
      await schema.validate(formValues, { abortEarly: false });
      setErrors({});

      let base64Picture: string | null = null;
      if (formValues.picture && formValues.picture[0]) {
        base64Picture = await fileToBase64(formValues.picture[0]);
      }

      addUncontrolledFormData({
        id: Date.now().toString(),
        ...formValues,
        picture: base64Picture,
      });

      navigate(ROUTES.HOME);
      // setSubmitted(true);
    } catch (err) {
      if (err instanceof YupValidationError) {
        const formattedErrors: ValidationErrors = {};
        err.inner.forEach((validationErr) => {
          if (validationErr.path) {
            formattedErrors[validationErr.path as keyof ValidationErrors] =
              validationErr.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField
        id={INPUT_NAME.NAME}
        label={INPUT_LABEL.NAME}
        type={INPUT_TYPE.TEXT}
        required
        inputRef={refs.name}
        error={errors.name}
      />

      <TextField
        id={INPUT_NAME.AGE}
        label={INPUT_LABEL.AGE}
        type={INPUT_TYPE.NUMBER}
        required
        inputRef={refs.age}
        error={errors.age}
      />

      <TextField
        id={INPUT_NAME.EMAIL}
        label={INPUT_LABEL.EMAIL}
        type={INPUT_TYPE.EMAIL}
        required
        inputRef={refs.email}
        error={errors.email}
      />

      <TextField
        id={INPUT_NAME.PASSWORD}
        label={INPUT_LABEL.PASSWORD}
        type={INPUT_TYPE.PASSWORD}
        required
        inputRef={refs.password}
        error={errors.password}
      />

      <TextField
        id={INPUT_NAME.CONFIRM_PASSWORD}
        label={INPUT_LABEL.CONFIRM_PASSWORD}
        type={INPUT_TYPE.PASSWORD}
        required
        inputRef={refs.confirmPassword}
        error={errors.confirmPassword}
      />

      <SelectField
        id={INPUT_NAME.COUNTRY}
        label={INPUT_LABEL.COUNTRY}
        options={countries}
        required
        inputRef={refs.country}
        error={errors.country}
      />

      <div className="flex flex-col mb-4">
        <p className="block font-medium text-[var(--color-base-content)] mb-1">
          {INPUT_LABEL.GENDER}{' '}
          <span className="text-[var(--color-error-content)]">*</span>
        </p>
        <div className="flex gap-4">
          {genderOptions.map((option, index) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name={INPUT_NAME.GENDER}
                value={option.value}
                ref={genderRefs[index]}
                className="accent-[var(--color-primary)]"
              />
              {option.label}
            </label>
          ))}
        </div>
        <p className="text-[var(--color-error-content)] text-sm mt-1 min-h-[1.25rem]">
          {errors.gender || '\u00A0'}
        </p>
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor={INPUT_NAME.PICTURE} className="block font-medium mb-1">
          {INPUT_LABEL.PICTURE}{' '}
          <span className="text-[var(--color-error-content)]">*</span>
        </label>
        <input
          id={INPUT_NAME.PICTURE}
          type="file"
          accept="image/png, image/jpeg"
          ref={refs.picture}
          className="block w-full text-sm text-[var(--color-base-content)] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-primary)] file:text-[var(--color-base-content)] cursor-pointer"
        />
        <p className="text-[var(--color-error-content)] mt-1 min-h-[1.25rem]">
          {errors.picture || '\u00A0'}
        </p>
      </div>

      <CheckboxField
        id={INPUT_NAME.ACCEPT_TERMS}
        label={INPUT_LABEL.ACCEPT_TERMS}
        inputRef={refs.acceptTerms}
        error={errors.acceptTerms}
      />

      <button type={BUTTONS_TYPE.SUBMIT} className={submitButtonClasses}>
        {BUTTONS.SUBMIT}
      </button>
    </form>
  );
}
