import { configureStore } from '@reduxjs/toolkit';

import countryReducer from './slices/country-slice';
import formReducer from './slices/form-slice';

export const store = configureStore({
  reducer: {
    forms: formReducer,
    country: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
