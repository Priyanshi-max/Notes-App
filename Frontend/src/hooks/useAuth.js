import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading,setIsLoggedIn } from "../Redux/auth";
export default function useAuth() {
  const dispatch = useDispatch();
  const {isLoading,isLoggedIn} = useSelector(state=>state.auth);
  
    useEffect(() => {
        dispatch(setIsLoading(true));
        axios
            .get(BASE_URL + "/user/auth", {
                withCredentials: true,
            })
            .then((res) => {
                if (res.data.status === 1) {
                   dispatch(setIsLoggedIn(true));
                  } else {
                  dispatch(setIsLoggedIn(false));
                }
            })
            .catch(() => {
                setIsLoggedIn(false);
            })
            .finally(() => {
              dispatch(setIsLoading(false));
            });
    }, [dispatch]);
    return [isLoggedIn, isLoading];
}
