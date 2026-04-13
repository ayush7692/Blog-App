import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice"
import blog from "./blog/blogSlice"

const store = configureStore({
    reducer: { auth,blog }
})


export default store