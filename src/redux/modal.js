import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: INITIAL_STATE,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },

    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const selectIsOpenModal = state => state.modal.isOpen;

export const { openModal, closeModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
