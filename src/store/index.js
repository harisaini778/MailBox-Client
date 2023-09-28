
import { configureStore } from "@reduxjs/toolkit";
import verificationReducer from "./auth";


const store = configureStore({
    reducer: {
        verification: verificationReducer,
    }
})
export default store;