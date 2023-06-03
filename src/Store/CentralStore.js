import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";

const centralStore = configureStore({
    reducer: {
        authentication: AuthReducer
    }
})

export default centralStore;