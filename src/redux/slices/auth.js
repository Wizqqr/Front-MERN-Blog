import { createSlice, createAsyncThunk, combineReducers } from "@reduxjs/toolkit";
import axios from '../../axios.js';

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchUserMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
})


const initialState = {
    data: null,
    status: 'loading',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data =null;
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status ='succeeded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'failed';
            state.data = null;
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status ='succeeded';
            state.data = action.payload;
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'failed';
            state.data = null;
        },
        [fetchRegister.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status ='succeeded';
            state.data = action.payload;
        },
        [fetchRegister.rejected]: (state) => {
            state.status = 'failed';
            state.data = null;
        },
    },
})

export const isAuthSelector = state => Boolean(state.auth.data)

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions