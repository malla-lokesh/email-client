import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    idToken: localStorage.getItem('idToken') || '',
    email: localStorage.getItem('email') || ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        addSignupDetails(state, action) {
            const { mail, token } = action.payload;
            state.email = mail;
            state.idToken = token;
            localStorage.setItem('email', state.email);
            localStorage.setItem('token', state.idToken);
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;