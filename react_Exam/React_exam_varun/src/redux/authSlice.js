import { createSlice } from '@reduxjs/toolkit';

const savedUser = localStorage.getItem('blog_user');
const initialUser = savedUser ? JSON.parse(savedUser) : null;

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: !!initialUser,
        user: initialUser,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
            localStorage.setItem('blog_user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            localStorage.removeItem('blog_user');
        },
        loginFailure: (state, action) => {
            state.error = action.payload;   
        },
        clearAuthError: (state) => {
            state.error = null;
        }
    }
});

export const { loginSuccess, logout, loginFailure, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
