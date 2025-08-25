import * as yup from 'yup';

import type { Gender } from '../types/types';
import { FORM_MESSAGES, GENDER } from '../types/types';

export const schema = yup
  .object({
    name: yup
      .string()
      .required(FORM_MESSAGES.NAME_REQUIRED)
      .matches(/^[A-Z\u0410-\u042F]/, FORM_MESSAGES.NAME_CAPITAL),
    age: yup
      .number()
      .typeError(FORM_MESSAGES.AGE_TYPE)
      .positive(FORM_MESSAGES.AGE_POSITIVE)
      .integer(FORM_MESSAGES.AGE_INTEGER)
      .required(FORM_MESSAGES.AGE_REQUIRED),
    email: yup
      .string()
      .email(FORM_MESSAGES.EMAIL_INVALID)
      .required(FORM_MESSAGES.EMAIL_REQUIRED),
    password: yup
      .string()
      .required(FORM_MESSAGES.PASSWORD_REQUIRED)
      .min(8, FORM_MESSAGES.PASSWORD_MIN)
      .matches(/[A-Z]/, FORM_MESSAGES.PASSWORD_UPPER)
      .matches(/[a-z]/, FORM_MESSAGES.PASSWORD_LOWER)
      .matches(/\d/, FORM_MESSAGES.PASSWORD_NUMBER)
      .matches(/[\W_]/, FORM_MESSAGES.PASSWORD_SPECIAL),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], FORM_MESSAGES.CONFIRM_MATCH)
      .required(FORM_MESSAGES.CONFIRM_REQUIRED),
    gender: yup
      .mixed<Gender>()
      .oneOf(
        [GENDER.MALE, GENDER.FEMALE, GENDER.UNKNOWN],
        FORM_MESSAGES.GENDER_REQUIRED
      )
      .required(FORM_MESSAGES.GENDER_REQUIRED),
    acceptTerms: yup
      .boolean()
      .oneOf([true], FORM_MESSAGES.TERMS_REQUIRED)
      .required(),
    picture: yup
      .mixed<FileList>()
      .required(FORM_MESSAGES.PICTURE_REQUIRED)
      .test(
        'fileSize',
        FORM_MESSAGES.FILE_SIZE,
        (value) => !value || (value[0]?.size ?? 0) <= 5000000
      )
      .test(
        'fileType',
        FORM_MESSAGES.FILE_TYPE,
        (value) =>
          !value || ['image/jpeg', 'image/png'].includes(value[0]?.type)
      ),
    country: yup.string().required(FORM_MESSAGES.COUNTRY_REQUIRED),
  })
  .required();
