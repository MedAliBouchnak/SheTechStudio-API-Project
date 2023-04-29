import { createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getGames = createAsyncThunk(
    "game/getgames", async (info, {rejectWithValue}) => {
        try {
            const {data} = await axios.get('/api/v1/game/getgames')
            console.log(data)
            return data
        
    } catch (error) {
                console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
    }
 )


 // get games by top players
 export const gamesByTopPlayers = createAsyncThunk(
    "game/gamesbyplayers", async ({genre, platforms}, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(`/api/v1/game/select_top_by_players?genre=${genre}&platform=${platforms}`)
            console.log(data)
            console.log('genre :', genre, "platforms :", platforms)
            return data
        
    } catch (error) {
                console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
    }
 )


  // get games by Play Time
  export const gamesByPlayTime = createAsyncThunk(
    "game/gamesbyplaytime", async ({genre, platforms}, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(`/api/v1/game/select_top_by_players?genre=${genre}&platform=${platforms}`)
            console.log(data)
            console.log('genre :', genre, "platforms :", platforms)
            return data
        
    } catch (error) {
                console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
    }
 )

 export const deleteGame = createAsyncThunk(
    "game/deletegame", async (id, {rejectWithValue}) => {
        try {
            // const token = localStorage.getItem("token")
            const {data} = await axios.delete(`/api/v1/game/deletegame/${id}`,{headers:{token: localStorage.getItem("token")}})
            console.log(data)
            return data
        
    } catch (error) {
                console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
    }
 )

export const gameSlice = createSlice({
    name: "game",
    initialState: {
        gameList: [],
        topPlayer: [],
        isLoading : false,
        errors: null,
        token: localStorage.getItem("token") || null
    },

    extraReducers: {
        // ! GET ALL GAMES
        [getGames.pending] : (state) => {
            state.isLoading = true
        },
        [getGames.fulfilled] : (state, action) => {
            state.errors = null
            state.isLoading = false
            state.gameList = action.payload.games
        },
        [getGames.rejected] : (state, action) => {
            state.isLoading = false
            state.errors = action.payload
        },
       
        // ! GET TOP GAMES BY PLAYERS
        [gamesByTopPlayers.pending] : (state) => {
            state.isLoading = true
        },
        [gamesByTopPlayers.fulfilled] : (state, action) => {
            state.errors = null
            state.isLoading = false
            state.gameList = action.payload.games
        },
        [gamesByTopPlayers.rejected] : (state, action) => {
            state.isLoading = false
            state.errors = action.payload
        },

        // ! GET TOP GAMES BY PLAY TIME
        [gamesByPlayTime.pending] : (state) => {
            state.isLoading = true
        },
        [gamesByPlayTime.fulfilled] : (state, action) => {
            state.errors = null
            state.isLoading = false
            state.gameList = action.payload.games
        },
        [gamesByPlayTime.rejected] : (state, action) => {
            state.isLoading = false
            state.errors = action.payload
        },

        // ! DELETE GAME BY ID
        [deleteGame.pending] : (state) => {
            state.isLoading = true
        },
        [deleteGame.fulfilled] : (state, action) => {
            state.errors = null
            state.isLoading = false
            state.gameList = action.payload.games
            // state.token = action.payload.token
            // localStorage.getItem("token")
        },
        [deleteGame.rejected] : (state, action) => {
            state.isLoading = false
            state.errors = action.payload
        },
    }
})

export default  gameSlice.reducer
// export const {increment, decrement, logout} = userSlice.actions