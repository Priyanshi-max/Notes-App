import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    isLoading:true,
    isLoggedIn:false,
    error:''

}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setError:(state,action)=>{
            state.error = action.payload;
        },
        setIsLoading:(state,action)=>{
            state.isLoading = action.payload;
        },
        setIsLoggedIn:(state,action)=>{
            state.isLoggedIn = action.payload;
        },
    },
})
export default authSlice.reducer;
export const  {
    setError,
    setIsLoading,
    setIsLoggedIn
} = authSlice.actions;