import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: "",
    username: "",
    email: "",
    uid: ""
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // reducer to pass in the details in (initial) state
    signInUser: (state, action) => {
        state.name = action.payload.name
        state.username = action.payload.username
        state.email = action.payload.email
        state.uid = action.payload.uid 
    },
    // reducer to set all details back to "" (initial empty state)
    signOutUser: (state) => {
        state.name = ""
        state.username = ""
        state.email = ""
        state.uid = ""
    }
  }
});

export const {signInUser, signOutUser} = userSlice.actions
export default userSlice.reducer