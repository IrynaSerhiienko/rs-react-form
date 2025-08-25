export const MODAL = {
  CLOSE_BUTTON: 'Close',
  OPEN_BUTTON: 'Open',

  TITLE: 'Choose form',
  DESCRIPTION: 'Select which form to open:',

  FORMS: {
    UNCONTROLLED: 'Uncontrolled Form',
    REACT_HOOK_FORM: 'React Hook Form',
  },
} as const;

export const HOME_PAGE = {
  TITLE: 'Registered Users',
  REGISTER_TEXT: 'Already registered? If not, ',
  REGISTER_LINK: 'register here',
} as const;

export const KEY_CODES = {
  ESCAPE: 'Escape',
} as const;

export const ROUTES = {
  HOME: '/',
  REGISTER: 'register',
  Error404Page: '*',
} as const;

export const ROUTE_LABELS = {
  HOME: 'Home',
  REGISTER: 'Register',
} as const;

export const ERROR404 = {
  TIMEOUT_MS: 5000,
  TITLE: '404 - Page not found',
  REDIRECT_MESSAGE:
    'You will be automatically redirected to the Home Page in 5 seconds.',
  LINK_TEXT: 'go to Home Page now',
} as const;

export const FORM_MESSAGES = {
  NAME_REQUIRED: 'Enter your name',
  NAME_CAPITAL: 'The first letter must be capitalized',

  AGE_TYPE: 'Must be a number',
  AGE_POSITIVE: 'Age must be positive',
  AGE_INTEGER: 'Only integer numbers allowed',
  AGE_REQUIRED: 'Enter your age',

  EMAIL_INVALID: 'Invalid email',
  EMAIL_REQUIRED: 'Enter your email',

  PASSWORD_REQUIRED: 'Enter a password',
  PASSWORD_MIN: 'Minimum 8 characters',
  PASSWORD_UPPER: 'At least one uppercase letter required',
  PASSWORD_LOWER: 'At least one lowercase letter required',
  PASSWORD_NUMBER: 'At least one number required',
  PASSWORD_SPECIAL: 'At least one special character required',

  CONFIRM_REQUIRED: 'Confirm your password',
  CONFIRM_MATCH: 'Passwords must match',

  GENDER_REQUIRED: 'Select your gender',

  TERMS_REQUIRED: 'You must accept the terms and conditions',

  PICTURE_REQUIRED: 'Upload a picture',

  FILE_SIZE: 'File is too large',
  FILE_TYPE: 'Invalid file format',

  COUNTRY_REQUIRED: 'Select your country',
} as const;

export type FormType =
  | typeof MODAL.FORMS.UNCONTROLLED
  | typeof MODAL.FORMS.REACT_HOOK_FORM;

export const INPUT_TYPE = {
  TEXT: 'text',
  NUMBER: 'number',
  EMAIL: 'email',
  PASSWORD: 'password',
  RADIO: 'radio',
  PICTURE: 'file',
} as const;

export const INPUT_NAME = {
  NAME: 'name',
  AGE: 'age',
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  GENDER: 'gender',
  PICTURE: 'picture',
  ACCEPT_TERMS: 'acceptTerms',
  COUNTRY: 'country',
} as const;

export const INPUT_LABEL = {
  NAME: 'Name',
  AGE: 'Age',
  EMAIL: 'Email',
  PASSWORD: 'Password',
  CONFIRM_PASSWORD: 'Confirm Password',
  GENDER: 'Gender',
  PICTURE: 'Upload picture',
  ACCEPT_TERMS: 'Accept Terms and Conditions',
  COUNTRY: 'Country',
} as const;

export const ACCEPT_TERMS = {
  YES: 'yes',
  NO: 'no',
} as const;

export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  UNKNOWN: 'unknown',
} as const;

export type Gender = (typeof GENDER)[keyof typeof GENDER];

export const FORM_INFO = {
  REQUIRED_FIELDS: 'Fields marked with * are required!',
} as const;

export const BUTTONS_TYPE = {
  SUBMIT: 'submit',
} as const;

export const BUTTONS = {
  SUBMIT: 'Submit',
} as const;

export const genderOptions = [
  { label: GENDER.MALE, value: GENDER.MALE },
  { label: GENDER.FEMALE, value: GENDER.FEMALE },
  { label: GENDER.UNKNOWN, value: GENDER.UNKNOWN },
];
