import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  language: string;
}

const initialState: UiState = {
  language: 'tr'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    }
  }
});

export const { setLanguage } = uiSlice.actions;
export default uiSlice.reducer; 