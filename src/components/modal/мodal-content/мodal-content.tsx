import type { FormType } from '../../../types/types';
import { MODAL } from '../../../types/types';
import { ReactHookForm } from '../../form/react-hook-form/react-hook-form';
import { UncontrolledForm } from '../../form/uncontrolled-form/uncontrolled-form';

type ModalContentProps = {
  onClose: () => void;
  onOpen: (form: FormType) => void;
  activeForm: FormType | null;
  modalRef: React.RefObject<HTMLDivElement | null>;
};

export function ModalContent(props: ModalContentProps) {
  const { onClose, onOpen, activeForm, modalRef } = props;
  return (
    <div
      ref={modalRef}
      className="relative bg-[var(--color-base-100)] p-4 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto text-[var(--color-base-content)] flex flex-col"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-[var(--color-error-content)] font-bold text-lg cursor-pointer"
        aria-label={MODAL.CLOSE_BUTTON}
      >
        ✕
      </button>

      {!activeForm && (
        <>
          <h1 className="text-xl md:text-2xl font-bold text-center mb-4 text-[var(--color-primary-content)]">
            {MODAL.TITLE}
          </h1>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => onOpen(MODAL.FORMS.UNCONTROLLED)}
              className="w-48 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-base-content)] rounded hover:bg-[var(--color-primary-content)] hover:text-[var(--color-base-100)] transition duration-500 cursor-pointer"
            >
              {MODAL.FORMS.UNCONTROLLED}
            </button>
            <button
              onClick={() => onOpen(MODAL.FORMS.REACT_HOOK_FORM)}
              className="w-48 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-base-content)] rounded hover:bg-[var(--color-primary-content)] hover:text-[var(--color-base-100)] transition duration-500 cursor-pointer"
            >
              {MODAL.FORMS.REACT_HOOK_FORM}
            </button>
          </div>
        </>
      )}

      {activeForm && (
        <div className="mt-6 w-full">
          {activeForm === MODAL.FORMS.UNCONTROLLED && <UncontrolledForm />}
          {activeForm === MODAL.FORMS.REACT_HOOK_FORM && <ReactHookForm />}
        </div>
      )}
    </div>
  );
}
