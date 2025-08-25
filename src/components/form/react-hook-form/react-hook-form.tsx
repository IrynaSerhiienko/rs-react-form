import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { InferType } from 'yup';

import { useCountries } from '../../../store/hooks/use-countries';
import { useForms } from '../../../store/hooks/use-forms';
import {
  BUTTONS,
  FORM_INFO,
  genderOptions,
  INPUT_LABEL,
  INPUT_NAME,
  INPUT_TYPE,
  ROUTES,
} from '../../../types/types';
import { fileToBase64 } from '../../../utils/file-to-base64';
import { schema } from '../../../utils/form-validation';
import { CheckboxField } from '../inputs/checkbox-field/checkbox-field';
import { FileField } from '../inputs/file-field/file-field';
import { RadioField } from '../inputs/radio-field/radio-field';
import { SelectField } from '../inputs/select-field/select-field';
import { TextField } from '../inputs/text-field/text-field';

type FormData = InferType<typeof schema>;

export function ReactHookForm() {
  const navigate = useNavigate();
  const { addReactHookFormData } = useForms();
  const { countries } = useCountries();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      password: '',
      confirmPassword: '',
      gender: undefined,
      acceptTerms: false,
      picture: undefined,
      country: '',
    },
  });

  const submitButtonClasses = clsx(
    'px-4 py-2 rounded-md transition-colors duration-500 text-base md:text-lg',
    isValid
      ? 'bg-[var(--color-primary)] text-[var(--color-base-content)] hover:bg-[var(--color-primary-content)] hover:text-[var(--color-base-100)] cursor-pointer'
      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
  );

  const onSubmit = async (data: FormData) => {
    let base64Picture: string | null = null;
    if (data.picture && data.picture[0]) {
      base64Picture = await fileToBase64(data.picture[0]);
    }

    const payload = {
      id: Date.now().toString(),
      ...data,
      picture: base64Picture,
    };

    addReactHookFormData(payload);
    reset();
    navigate(ROUTES.HOME);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p className="text-[var(--color-info-content)] mb-2 text-base md:text-lg">
        {FORM_INFO.REQUIRED_FIELDS}
      </p>
      <TextField
        id={INPUT_NAME.NAME}
        label={INPUT_LABEL.NAME}
        type={INPUT_TYPE.TEXT}
        required
        {...register(INPUT_NAME.NAME)}
        error={errors.name?.message}
      />

      <TextField
        id={INPUT_NAME.AGE}
        label={INPUT_LABEL.AGE}
        type={INPUT_TYPE.NUMBER}
        required
        {...register(INPUT_NAME.AGE)}
        error={errors.age?.message}
      />

      <TextField
        id={INPUT_NAME.EMAIL}
        label={INPUT_LABEL.EMAIL}
        type={INPUT_TYPE.EMAIL}
        required
        {...register(INPUT_NAME.EMAIL)}
        error={errors.email?.message}
      />

      <TextField
        id={INPUT_NAME.PASSWORD}
        label={INPUT_LABEL.PASSWORD}
        type={INPUT_TYPE.PASSWORD}
        required
        {...register(INPUT_NAME.PASSWORD)}
        error={errors.password?.message}
      />

      <TextField
        id={INPUT_NAME.CONFIRM_PASSWORD}
        label={INPUT_LABEL.CONFIRM_PASSWORD}
        type={INPUT_TYPE.PASSWORD}
        required
        {...register(INPUT_NAME.CONFIRM_PASSWORD)}
        error={errors.confirmPassword?.message}
      />

      <SelectField
        id={INPUT_NAME.COUNTRY}
        label={INPUT_LABEL.COUNTRY}
        options={countries}
        required
        {...register(INPUT_NAME.COUNTRY)}
        error={errors.country?.message}
      />

      <RadioField
        id={INPUT_NAME.GENDER}
        label={INPUT_LABEL.GENDER}
        options={genderOptions}
        required
        register={register}
        error={errors.gender?.message}
      />

      <FileField
        id={INPUT_NAME.PICTURE}
        label={INPUT_LABEL.PICTURE}
        required
        register={register}
        error={errors.picture?.message}
      />

      <CheckboxField
        id={INPUT_NAME.ACCEPT_TERMS}
        label={INPUT_LABEL.ACCEPT_TERMS}
        {...register(INPUT_NAME.ACCEPT_TERMS)}
        error={errors.acceptTerms?.message}
      />

      <button type="submit" disabled={!isValid} className={submitButtonClasses}>
        {BUTTONS.SUBMIT}
      </button>
    </form>
  );
}
