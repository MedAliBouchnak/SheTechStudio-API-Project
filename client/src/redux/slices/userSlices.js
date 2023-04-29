import { createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const register = createAsyncThunk(
    "user/register", async (info, {rejectWithValue}) => {
        try {
            const {data} = await axios.post('/api/v1/user/register', info)
            console.log(data)
            return data
        
    } catch (error) {
                console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
    }
 )


 export const login = createAsyncThunk(
    "user/login", async (info, {rejectWithValue}) => {
        try {
            const {data} = await axios.post('/api/v1/user/login', info)
            console.log(data)
            return data
        
    } catch (error) {
                console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
    }
 )
 

 export const getUserInfo = createAsyncThunk(
    "user/getUserInfo", async (info, {rejectWithValue}) => {
        try {
            const {data} = await axios.get('/api/v1/user/userinfo',{headers:{token: localStorage.getItem("token")}})
            console.log(data)
            return data
        
    } catch (error) {
                console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
    }
 )


export const userSlice = createSlice({
    name: "user",
    initialState: {
        count: 0,
        userInfo: {},
        isLoading : false,
        errors: null,
        token : localStorage.getItem("token") || null,
        isAuth: Boolean(localStorage.getItem("isAuth")) || false
    },

    reducers: {
        increment : (state) => { state.count = state.count + 1},
        decrement : (state) => { state.count = state.count - 1},
        logout : (state) => {
            localStorage.removeItem("isAuth")
            localStorage.removeItem("token")
            state.isAuth = false
            state.token = null
            state.userList = {} 
        }
    },

    extraReducers: {
        // ! REGISTER HANDLER
        [register.pending] : (state) => {
            state.isLoading = true
        },
        [register.fulfilled] : (state, action) => {
            state.errors = null
            state.isLoading = false
            state.isAuth = true
            localStorage.setItem("isAuth", true)
            state.token = action.payload.token
            localStorage.setItem("token", action.payload.token)
        },
        [register.rejected] : (state, action) => {
            state.isLoading = false
            state.errors = action.payload
        },

        // ! LOGIN HANDLER
        [login.pending] : (state) => {
            state.isLoading = true
        },
        [login.fulfilled] : (state, action) => {
            state.errors = null
            state.isLoading = false
            state.isAuth = true
            localStorage.setItem("isAuth", true)
            state.token = action.payload.token
            localStorage.setItem("token", action.payload.token)
        },
        [login.rejected] : (state, action) => {
            state.isLoading = false
            state.errors = action.payload
        },

        // ! USER INFO HANDLER
        [getUserInfo.pending] : (state) => {
            state.isLoading = true
        },
        [getUserInfo.fulfilled] : (state, action) => {
            state.errors = null
            state.isLoading = false
            state.userInfo = action.payload.user
          
        },
        [getUserInfo.rejected] : (state, action) => {
            state.isLoading = false
            state.errors = action.payload
        },
    }
})

export default  userSlice.reducer
export const {increment, decrement, logout} = userSlice.actions