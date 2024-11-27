import { createSlice } from "@reduxjs/toolkit"
import { apiLogout } from "./operations";

const INITIAL_STATE = {
    user: {
        name: null,
        email: null,
        gender: null,
        photo: null,
        waterNorm: null,
        sportHours: null,
        weight: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        resetError(state) {
            state.error = null;
        },
    },

    extraReducers(builder) {

        builder

            // Logout user
            .addCase(apiLogout.pending,
                (state) => {
                    state.error = null;
                })
            .addCase(apiLogout.fulfilled, () => {
                return INITIAL_STATE;
            })
            .addCase(apiLogout.rejected,
                (state, { payload }) => {
                    state.error = payload;
                })

    }
})


export const { resetError } = authSlice.actions;
export const authReducer = authSlice.reducer;