import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios.js';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts')
    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('/tags')
    return data
})

export const fetchPopularPosts = createAsyncThunk('posts/fetchPopularPosts', async () =>{
    const {data} = await axios.get('/posts/popular')
    return data
})

export const fetchMyPosts = createAsyncThunk('posts/fetchMyPosts', async () =>{
    const {data} = await axios.get('/posts/myposts')
    return data
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>{
    const {data} = await axios.delete(`/posts/${id}`)
    return data
})


const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
    popularPosts: {
        items: [],
        status: 'loading',
    },
    myPosts: {
        items: [],
        status: 'loading',
    }
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {


    [fetchPosts.pending]: (state) => {
        state.posts.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = 'loaded'
    },
    [fetchPosts.rejected]: (state, action) => {
        state.posts.items = [];
        state.posts.status = 'error'
        console.error('Error fetching posts:', action.error);
    },


    [fetchTags.pending]: (state) => {
        state.tags.status = 'loading'
    },
    [fetchTags.fulfilled]: (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = 'loaded'
    },
    [fetchTags.rejected]: (state, action) => {
        state.tags.items = [];
        state.tags.status = 'error'
        console.error('Error fetching tags:', action.error);
    },


    [fetchPopularPosts.pending]: (state) => {
        state.popularPosts.status = 'loading'
    },
    [fetchPopularPosts.fulfilled]: (state, action) => {
        state.popularPosts.items = action.payload;
        state.popularPosts.status = 'loaded'
    },
    [fetchPopularPosts.rejected]: (state, action) => {
        state.popularPosts.items = [];
        state.popularPosts.status = 'error'
        console.error('Error fetching popular posts:', action.error);
    },

    [fetchMyPosts.pending]: (state) => {
        state.myPosts.status = 'loading'
    },
    [fetchMyPosts.fulfilled]: (state, action) => {
        state.myPosts.items = action.payload;
        state.myPosts.status = 'loaded'
    },
    [fetchMyPosts.rejected]: (state, action) => {
        state.myPosts.items = [];
        state.myPosts.status = 'error'
        console.error('Error fetching your posts:', action.error);
    },

    [fetchRemovePost.pending]: (state,action) => {
        state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
    }
    }
})

export const postsReducer = postsSlice.reducer;
