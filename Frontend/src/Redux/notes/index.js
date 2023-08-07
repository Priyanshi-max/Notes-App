import {createSlice} from "@reduxjs/toolkit"
import { getNotes } from "./noteThunks";

const initialState = {
    loading:false,
    error:false,
    notes:[],

}

const noteSlice = createSlice({
    name:"note",
    initialState,
    reducers:{
        setError:(state,action)=>{
            state.error = action.payload;
        },
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(getNotes.fulfilled,(state,action)=>{
            state.notes = action.payload;
        });
    }
})
export default noteSlice.reducer;
export const  {
    setError,
    setLoading,
} = noteSlice.actions;