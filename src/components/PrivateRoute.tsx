import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@heroui/spinner";

const PrivateRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    // Show loading indicator or wait until authentication is determined
    if (isLoading) {
        return <Spinner classNames={{ label: "text-foreground mt-4" }} label="wave" variant="wave" />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;