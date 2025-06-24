import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  signUpModalOpen: false,
  logInModalOpen: false,
  commentModalOpen: false,
  commentPostDetails: {
    name: "",
    username: "",
    id: "",
    text: "",
  }
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.signUpModalOpen = true;
    },
    closeSignUpModal: (state) => {
      state.signUpModalOpen = false;
    },

    openLogInModal: (state) => {
      state.logInModalOpen = true;
    },
    closeLogInModal: (state) => {
      state.logInModalOpen = false;
    },

    openCommentModal: (state) => {
      state.commentModalOpen = true;
    },
    closeCommentModal: (state) => {
      state.commentModalOpen = false;
    },
    setCommentDetails: (state, action) => {
      state.commentPostDetails.name = action.payload.name;
      state.commentPostDetails.username = action.payload.username;
      state.commentPostDetails.id = action.payload.id;
      state.commentPostDetails.text = action.payload.text;
    },
  }
});

export const {
  openSignUpModal, closeSignUpModal,
  openLogInModal, closeLogInModal,
  openCommentModal, closeCommentModal,
  setCommentDetails,
} = modalSlice.actions

export default modalSlice.reducer