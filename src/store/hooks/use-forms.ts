import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../index';
import {
  addReactHookForm,
  addUncontrolledForm,
  type FormData,
} from '../slices/form-slice';

export const useForms = () => {
  const dispatch = useDispatch<AppDispatch>();

  const reactHookForm = useSelector(
    (state: RootState) => state.forms.reactHookForm
  );
  const uncontrolledForm = useSelector(
    (state: RootState) => state.forms.uncontrolledForm
  );

  const lastAddedId = useSelector(
    (state: RootState) => state.forms.lastAddedId
  );

  const addReactHookFormData = (data: FormData) => {
    dispatch(addReactHookForm(data));
  };

  const addUncontrolledFormData = (data: FormData) => {
    dispatch(addUncontrolledForm(data));
  };

  return {
    reactHookForm,
    uncontrolledForm,
    lastAddedId,
    addReactHookFormData,
    addUncontrolledFormData,
  };
};
