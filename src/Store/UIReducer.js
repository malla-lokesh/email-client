const { createSlice } = require("@reduxjs/toolkit");

const initialUiState = {
    theme: 'light',
    composeMail: false,
}

const ui = createSlice({
    name: 'ui',
    initialState: initialUiState,
    reducers: {
        changeTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setComposeMail(state, action) {
            state.composeMail = action.payload;
        }
    }
})

export const uiActions = ui.actions;

export default ui.reducer;