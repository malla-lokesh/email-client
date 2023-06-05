import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import UIReducer from './UIReducer';

const centralStore = configureStore({
    reducer: {
        authentication: AuthReducer,
        ui: UIReducer
    }
})

export default centralStore;