const { createSlice } = require("@reduxjs/toolkit");

const initialUiState = {
    theme: 'light'
}

const ui = createSlice({
    name: 'ui',
    initialState: initialUiState,
    reducers: {
        changeTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    }
})

export const uiActions = ui.actions;

export default ui.reducer;