import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";


export default function PrivateRoute({ children }) {
    const [isLoggedIn, isLoading] = useAuth();

    if (isLoading) {
        return <h1>Loading</h1>;
    }
    if (!isLoggedIn) return <Navigate to='/login' />;

    return <>{children}</>
}
