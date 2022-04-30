/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export interface AppDataState {
  title: string;
}

const initialState: AppDataState = {
  title: "",
};

const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<AppDataState>) => {
      state.title = action.payload.title;
    },
  },
});

export const { updateTitle } = appDataSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default appDataSlice.reducer;
