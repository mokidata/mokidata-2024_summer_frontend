import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = {
    isAuthenticated : false
};

const apiSlice = createSlice({
    name:'auth',
    initialState : initialAuthState,
    reducer : {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
});


export default apiSlice.reducer;