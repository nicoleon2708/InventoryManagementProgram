import { createSlice, current } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },

        register: {
            isFetching: false,
            error: false,
        },

        logout: {
            isFetching: false,
            error: false,
        },

        verify_email: {
            isFetching: false,
            error: false,
        },

        recovery_password: {
            isSent: false,
            error: false,
        },

        reset_password: {
            isReset: false,
            error: false
        }
    },
    reducers: {
        // login state
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        // register state
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
        },

        // logout state
        logoutStart: (state) => {
            state.logout.isFetching = true;
            state.logout.error = false;

        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.login.currentUser = null;
            state.logout.error = false

        },
        logoutFailed: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },

        //verify mail
        verifyStart: (state) => {
            state.verify_email.isFetching = true;
            state.verify_email.error = false;
        },
        verifySuccess: (state) => {
            state.verify_email.isFetching = false;
            state.verify_email.error = false;
        },
        verifyFailed: (state) => {
            state.verify_email.isFetching = false;
            state.verify_email.error = true;
        },

        //recovery password state
        recoveryStart: (state) => {
            state.recovery_password.isSent = true;
        },
        recoverySuccess: (state) => {
            state.recovery_password.error = false;
            state.recovery_password.isSent = false;
        },
        recoveryFailed: (state) => {
            state.recovery_password.error = true;
            state.recovery_password.isSent = false;
        },

        // reset password state
        resetStart: (state) => {
            state.reset_password.isReset = true;
        },
        resetSuccess: (state) => {
            state.reset_password.isReset = false;
            state.reset_password.error = false;
        },
        resetFailed: (state) => {
            state.reset_password.isReset = false;
            state.reset_password.error = true;

        },

    }
})

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
    recoveryStart,
    recoverySuccess,
    recoveryFailed,
    resetStart,
    resetSuccess,
    resetFailed,
    verifyStart,
    verifyFailed,
    verifySuccess

} = authSlice.actions


export default authSlice.reducer
