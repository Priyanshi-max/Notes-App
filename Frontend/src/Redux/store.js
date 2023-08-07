import {configureStore} from "@reduxjs/toolkit" 
import noteReducer from "./notes";
import authReducer from "./auth";

const store = configureStore({
    reducer:{
        note:noteReducer,
        auth:authReducer
    }
})
export default store;