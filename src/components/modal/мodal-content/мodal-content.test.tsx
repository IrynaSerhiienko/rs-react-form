import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { MODAL } from '../../../types/types';
import { ModalContent } from './мodal-content.tsx';

describe('ModalContent', () => {
  const onClose = vi.fn();
  const onOpen = vi.fn();
  const modalRef = React.createRef<HTMLDivElement>();

  it('renders title and form selection buttons when no activeForm', () => {
    render(
      <ModalContent
        onClose={onClose}
        onOpen={onOpen}
        activeForm={null}
        modalRef={modalRef}
      />
    );

    expect(screen.getByText(MODAL.TITLE)).toBeInTheDocument();
    expect(screen.getByText(MODAL.FORMS.UNCONTROLLED)).toBeInTheDocument();
    expect(screen.getByText(MODAL.FORMS.REACT_HOOK_FORM)).toBeInTheDocument();
  });

  it('renders form selection buttons when no activeForm', () => {
    render(
      <ModalContent
        onClose={onClose}
        onOpen={onOpen}
        activeForm={null}
        modalRef={modalRef}
      />
    );

    expect(screen.getByText(MODAL.FORMS.UNCONTROLLED)).toBeInTheDocument();
    expect(screen.getByText(MODAL.FORMS.REACT_HOOK_FORM)).toBeInTheDocument();
  });
  it('calls onClose when close button is clicked', async () => {
    render(
      <ModalContent
        onClose={onClose}
        onOpen={onOpen}
        activeForm={null}
        modalRef={modalRef}
      />
    );

    const closeButton = screen.getByLabelText(MODAL.CLOSE_BUTTON);
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it('calls onOpen with correct form when a form button is clicked', async () => {
    render(
      <ModalContent
        onClose={onClose}
        onOpen={onOpen}
        activeForm={null}
        modalRef={modalRef}
      />
    );

    const uncontrolledBtn = screen.getByText(MODAL.FORMS.UNCONTROLLED);
    const rhfBtn = screen.getByText(MODAL.FORMS.REACT_HOOK_FORM);

    await userEvent.click(uncontrolledBtn);
    expect(onOpen).toHaveBeenCalledWith(MODAL.FORMS.UNCONTROLLED);

    await userEvent.click(rhfBtn);
    expect(onOpen).toHaveBeenCalledWith(MODAL.FORMS.REACT_HOOK_FORM);
  });
});
