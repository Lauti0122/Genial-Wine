import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ children, isAllowed, redirectTo="/auth/login" }) => { 

    if (isAllowed) return <Navigate to={redirectTo} />

    return children ? children : <Outlet />; //si le pasamos un componente hijo, lo va a retornar, sino retorna el outlet que es para retornar multiples rutas
}