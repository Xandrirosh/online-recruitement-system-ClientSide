import { createSlice } from "@reduxjs/toolkit";

const initalValue = {
  id: "",
  name: "",
  email: "",
  role: "",
}

const userSlice = createSlice({
  name: 'user',
  initialState: initalValue,
  reducers:{
    setUserDetails: (state, action) => {
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.role = action.payload?.role
    },
    logout: (state, action) => {
      state._id = ""
      state.name = ""
      state.email = ""
      state.role = ""
    }
  }
})

export const {setUserDetails, logout} = userSlice.actions

export default userSlice.reducer