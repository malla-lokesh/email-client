import { createSlice } from "@reduxjs/toolkit";

const initialInboxState = {
    mails: {},
    unReadMails: 0,
}

const inboxSlice = createSlice({
    name: 'inbox',
    initialState: initialInboxState,
    reducers: {
        incrementUnReadMails(state) {
            state.unReadMails++;
        },
        decrementUnReadMails(state) {
            state.unReadMails--;
        },
        setUnReadMails(state, action) {
            state.unReadMails = action.payload;
        }
    }
});

export const inboxActions = inboxSlice.actions;

export default inboxSlice.reducer;