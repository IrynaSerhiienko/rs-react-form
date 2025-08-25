import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FormData = {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: string | null;
  country: string;
};

type FormsState = {
  reactHookForm: FormData[];
  uncontrolledForm: FormData[];
  lastAddedId: string | null;
};

const initialState: FormsState = {
  reactHookForm: [],
  uncontrolledForm: [],
  lastAddedId: null,
};

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addReactHookForm(state, action: PayloadAction<FormData>) {
      state.reactHookForm = [action.payload];
      state.lastAddedId = action.payload.id;
    },
    addUncontrolledForm(state, action: PayloadAction<FormData>) {
      state.uncontrolledForm = [action.payload];
      state.lastAddedId = action.payload.id;
    },
  },
});

export const { addReactHookForm, addUncontrolledForm } = formSlice.actions;
export default formSlice.reducer;
