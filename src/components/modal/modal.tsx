import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { FormType } from '../../types/types';
import { KEY_CODES } from '../../types/types';
import { ModalContent } from './мodal-content/мodal-content';

export function Modal() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeForm, setActiveForm] = useState<FormType | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpen = (form: FormType) => {
    setActiveForm(form);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setActiveForm(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === KEY_CODES.ESCAPE && isOpen) handleClose();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-neutral)]/95 z-40">
            <div className="mt-16 w-full flex justify-center">
              <ModalContent
                onClose={handleClose}
                onOpen={handleOpen}
                activeForm={activeForm}
                modalRef={modalRef}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
