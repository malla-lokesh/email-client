import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    idToken: localStorage.getItem('idToken') || '',
    email: localStorage.getItem('email') || '',
    isLoginForm: true,
    isLoggedIn: !!localStorage.getItem('email')
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        addLoginDetails(state, action) {
            const { mail, token, login } = action.payload;
            state.email = mail;
            state.idToken = token;
            state.isLoggedIn = login
            localStorage.setItem('email', state.email);
            localStorage.setItem('idToken', state.idToken);
        },
        setIsLoginForm(state) {
            state.isLoginForm = !state.isLoginForm;
        },
        setLogout(state, action) {
            state.isLoggedIn = action.payload;
            localStorage.removeItem('email');
            localStorage.removeItem('idToken');
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;