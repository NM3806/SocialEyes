import { configureStore } from '@reduxjs/toolkit'
import modalSlice from "./slices/modalSlice" // the import (modalSlice) can be named anything
import userSlice from "./slices/userSlice"
import loadingSlice from "./slices/loadingSlice"

export const store = configureStore({
  reducer: {
    modals: modalSlice,
    user: userSlice,
    loading: loadingSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch