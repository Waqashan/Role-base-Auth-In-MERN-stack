import { configureStore } from "@reduxjs/toolkit";
import LogInReducer from "../feature/userLoginSlice"
import signupReducer from '../feature/signupSlice'

export const store = configureStore({
  reducer: {
    uerlogin:LogInReducer,
    userSignup:signupReducer
    
  },
});
