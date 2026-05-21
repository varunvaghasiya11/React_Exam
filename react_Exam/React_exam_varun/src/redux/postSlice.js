import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addPost = createAsyncThunk('posts/addPost', async (postData, { rejectWithValue }) => {
    try {
        const newPost = {
            ...postData,
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0]
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updatePost = createAsyncThunk('posts/updatePost', async (postData, { rejectWithValue }) => {
    try {
        const updatedPostData = {
            ...postData,
            updatedAt: new Date().toISOString().split('T')[0]
        };

        const response = await fetch(`${API_URL}/${postData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPostData),
        });

        if (!response.ok) {
            throw new Error('Failed to update post');
        }
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_URL}/${postId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete post');
        }
        return postId;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null,
        currentPostToEdit: null,
    },
    reducers: {
        setPostToEdit: (state, action) => {
            state.currentPostToEdit = action.payload;
        },
        clearPostToEdit: (state) => {
            state.currentPostToEdit = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            
            .addCase(addPost.pending, (state) => {
                state.error = null;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(addPost.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })

            .addCase(updatePost.pending, (state) => {
                state.error = null;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })

            .addCase(deletePost.pending, (state) => {
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            });
    },
});

export const { setPostToEdit, clearPostToEdit } = postSlice.actions;
export default postSlice.reducer;
