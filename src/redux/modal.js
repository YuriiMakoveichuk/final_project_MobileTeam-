import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isOpen: false,
  modalType: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: INITIAL_STATE,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload;
      document.body.classList.add("no-scroll");
    },

    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      document.body.classList.remove("no-scroll");
    },
  },
});

export const selectIsOpenModal = (state) => state.modal.isOpen;

export const selectModalType = (state) => state.modal.modalType;

export const { openModal, closeModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
