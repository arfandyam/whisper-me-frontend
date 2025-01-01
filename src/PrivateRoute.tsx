import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();

    console.log("user:", user)
    if (!user) {
        return <Navigate to="/"/>
    }

    return <>{children}</>
}

export default PrivateRoute;