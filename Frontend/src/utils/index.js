import axios from "axios";
import { BASE_URL } from "../constants/config";


export const logout = async()=>{
    try {
        let data = await axios(BASE_URL + "/user/logout", {
            method: "post",
        });
        let { message, status } = data.data;
        if (status === 1) {
           return Promise.resolve();
        }
        throw Error(message)
    } catch (error) {
        alert("Unable to Logout");
    }
};

export const login =  async (obj)=>{
    try {
        let data = await axios(BASE_URL + "/user/login", {
            method: "post",
            data: obj,
        });
        let {status,message } = data.data;
        if (status === 1) {
            return Promise.resolve();
        }
        throw Error(message);
    } catch (error) {
       return Promise.reject(error);
    }

}