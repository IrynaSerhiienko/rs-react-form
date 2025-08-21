import type { FormType } from '../../../types/types';
import { MODAL } from '../../../types/types';
import { ReactHookForm } from '../../form/react-hook-form/react-hook-form';
import { UncontrolledForm } from '../../form/uncontrolled-form/uncontrolled-form';

type ModalContentProps = {
  onClose: () => void;
  onOpen: (form: FormType) => void;
  activeForm: FormType | null;
};

export function ModalContent(props: ModalContentProps) {
  const { onClose, onOpen, activeForm } = props;
  return (
    <div className="relative bg-[var(--color-base-100)] p-6 rounded-lg shadow-lg w-full max-w-md text-[var(--color-base-content)] flex justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-[var(--color-error-content)] font-bold text-lg cursor-pointer"
        aria-label={MODAL.CLOSE_BUTTON}
      >
        ✕
      </button>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => onOpen(MODAL.FORMS.UNCONTROLLED)}
          className="w-48 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-base-content)] rounded  hover:bg-[var(--color-neutral-content)] hover:text-[var(--color-primary)] transition cursor-pointer"
        >
          {MODAL.FORMS.UNCONTROLLED}
        </button>
        <button
          onClick={() => onOpen(MODAL.FORMS.REACT_HOOK_FORM)}
          className="w-48 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-base-content)] rounded  hover:bg-[var(--color-neutral-content)] hover:text-[var(--color-primary)] transition cursor-pointer"
        >
          {MODAL.FORMS.REACT_HOOK_FORM}
        </button>
      </div>

      <div className="mt-6">
        {activeForm === MODAL.FORMS.UNCONTROLLED && <UncontrolledForm />}
        {activeForm === MODAL.FORMS.REACT_HOOK_FORM && <ReactHookForm />}
      </div>
    </div>
  );
}
