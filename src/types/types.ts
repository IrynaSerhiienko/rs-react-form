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

export const KEY_CODES = {
  ESCAPE: 'Escape',
} as const;

export const ERROR404 = {
  TIMEOUT_MS: 5000,
  TITLE: '404 - Page not found',
  REDIRECT_MESSAGE:
    'You will be automatically redirected to the Home Page in 5 seconds.',
  LINK_TEXT: 'go to Home Page now',
} as const;

export type FormType =
  | typeof MODAL.FORMS.UNCONTROLLED
  | typeof MODAL.FORMS.REACT_HOOK_FORM;
