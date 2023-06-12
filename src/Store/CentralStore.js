import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import UIReducer from './UIReducer';
import InboxReducer from "./InboxReducer";

const centralStore = configureStore({
    reducer: {
        authentication: AuthReducer,
        ui: UIReducer,
        inbox: InboxReducer
    }
})

export default centralStore;