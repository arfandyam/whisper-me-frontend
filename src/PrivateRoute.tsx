import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    console.log("user dari PrivateRoute:", user)
    if (!user) {
        return <Navigate to="/"/>
    }

    return <>{children}</>
}

export default PrivateRoute;