import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const userExist = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: null || userExist,
    userLoading: false,
    userSuccess: false,
    userError: false,
    userErrorMessage: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, actions) => {
                state.userLoading = true,
                    state.userSuccess = false,
                    state.userError = false
            })
            .addCase(registerUser.fulfilled, (state, actions) => {
                state.userLoading = false,
                    state.userSuccess = true,
                    state.user = actions.payload
                state.userError = false
            })
            .addCase(registerUser.rejected, (state, actions) => {
                state.userLoading = false,
                    state.userSuccess = false,
                    state.userError = true
                state.userErrorMessage = actions.payload
            })
            // Login 
            .addCase(loginUser.pending, (state, actions) => {
                state.userLoading = true,
                    state.userSuccess = false,
                    state.userError = false
            })
            .addCase(loginUser.fulfilled, (state, actions) => {
                state.userLoading = false,
                    state.userSuccess = true,
                    state.user = actions.payload,
                    state.userError = false
            })
            .addCase(loginUser.rejected, (state, actions) => {
                state.userLoading = false,
                    state.userSuccess = false,
                    state.userError = true
                state.userErrorMessage = actions.payload
            })
            .addCase(logout.fulfilled, (state, actions) => {
                state.userLoading = false,
                    state.userSuccess = true,
                    state.userError = false,
                    state.user = null
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.userLoading = false;
                state.userSuccess = true;
                const updatedUser = { ...state.user, ...action.payload };
                state.user = updatedUser;
                localStorage.setItem("user", JSON.stringify(updatedUser));
                state.userError = false;
            })
    }
});

// Export Slice and reducers
export const { } = authSlice.actions
export default authSlice.reducer


// Create Asynce Thunk...
export const registerUser = createAsyncThunk("REGISTER/USER", async (formData, thunkAPI) => {

    try {
        console.log(formData)
        const response = await axios.post("https://blog-backend-ten-psi.vercel.app/api/auth/register", formData)
        localStorage.setItem("user", JSON.stringify(response.data))
        return response.data
    } catch (error) {
        let message = error.response.data.msg
        return thunkAPI.rejectWithValue(message)
    }
})

// Login 
export const loginUser = createAsyncThunk("LOGIN/USER", async (formData, thunkAPI) => {
    try {
        const response = await axios.post("https://blog-backend-ten-psi.vercel.app/api/auth/login", formData)
        localStorage.setItem("user", JSON.stringify(response.data))
        return response.data
    } catch (error) {
        let message = error.response.data.msg
        return thunkAPI.rejectWithValue(message)
    }
})

//Logout 

export const logout = createAsyncThunk("LOGOUT/USER", () => {
    localStorage.removeItem("user")
})

// Update Profile
export const updateProfile = createAsyncThunk("UPDATE/PROFILE", async (profileData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const response = await axios.put("https://blog-backend-ten-psi.vercel.app/api/users/profile", profileData, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        let message = error.response.data.msg
        return thunkAPI.rejectWithValue(message)
    }
})