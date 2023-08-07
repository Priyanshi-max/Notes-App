import axios from "axios"

import { BASE_URL } from "../../constants/config"
import { createAsyncThunk } from "@reduxjs/toolkit"

axios.defaults.withCredentials=true;

export const getNotes= createAsyncThunk("note/get",async()=>{

        const res= await axios.get(BASE_URL+"/note")

        const {status,data} = res.data
        if (status===1) {
            return data;
        }else{
            return [];
        }
    
})
export const createNote= createAsyncThunk("note/create",async(obj,{dispatch})=>{

    const res= await axios(BASE_URL+"/note/create",{
        method:"post",
        data:obj,
    })

    const {status,message} = res.data;
    console.log(message)
    if(status===1){
        dispatch(getNotes());
    }
    
})
export const deleteNote= createAsyncThunk("note/create",async(id,{dispatch})=>{
    
    const res= await axios(BASE_URL+"/note/",{
        method:"delete",
        headers:{
            id:id
        }
    })

    const {status,message} = res.data
    console.log(message)
    if(status===1){
        dispatch(getNotes());
    }
    
})




export const updateNote = createAsyncThunk("note/update",async({id,obj},{dispatch})=>{
    const { data} = await axios(BASE_URL+"/note",{
        method:"patch",
        data:obj,
        headers:{
            id:id
        }
    })
    if (data.status===1) {
        console.log("update")
        dispatch(getNotes())
    }
})