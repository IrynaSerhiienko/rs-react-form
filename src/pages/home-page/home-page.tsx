import { Modal } from '../../components/modal/modal';
import { MODAL } from '../../types/types';

export function HomePage() {
  return (
    <>
      <h1 className="text-2xl md:text-4xl font-bold">{MODAL.TITLE}</h1>
      <Modal />
    </>
  );
}
