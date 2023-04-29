import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices"
import gameReducer from "./slices/gameSlice"


export default configureStore({reducer: {users: userReducer, games: gameReducer}})