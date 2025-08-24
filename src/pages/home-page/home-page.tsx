import { Card } from '../../components/card/card';
import { useForms } from '../../store/hooks/use-forms';
import { useNavigate } from 'react-router-dom';
import { HOME_PAGE, ROUTES } from '../../types/types';

export function HomePage() {
  const navigate = useNavigate();
  const { reactHookForm, uncontrolledForm, lastAddedId } = useForms();
  const forms = [...reactHookForm, ...uncontrolledForm];

  const handleRegisterClick = () => {
    navigate(ROUTES.REGISTER);
  };

  return (
    <>
      <h1 className="text-2xl md:text-4xl font-bold flex justify-center mb-4 text-[var(--color-primary-content)]">
        {HOME_PAGE.TITLE}
      </h1>
      <p
        className="text-center text-base md:text-lg mb-4 text-[var(--color-base-content)] cursor-pointer"
        onClick={handleRegisterClick}
      >
        {HOME_PAGE.REGISTER_TEXT}
        <span className="text-[var(--color-primary)] underline">
          {HOME_PAGE.REGISTER_LINK}
        </span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forms.map((data) => (
          <Card key={data.id} {...data} isNew={data.id === lastAddedId} />
        ))}
      </div>
    </>
  );
}
