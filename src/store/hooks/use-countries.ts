import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../index';
import { setCountries } from '../slices/country-slice';

export const useCountries = () => {
  const dispatch = useDispatch<AppDispatch>();

  const countries = useSelector((state: RootState) => state.country.countries);

  const updateCountries = (newCountries: string[]) => {
    dispatch(setCountries(newCountries));
  };

  return {
    countries,
    updateCountries,
  };
};
