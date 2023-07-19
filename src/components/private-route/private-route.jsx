import { Navigate } from "react-router-dom";

function PrivateRoute(props){

    const logado = localStorage.getItem("id_usuario") ? true : false;    

    return logado ? props.children : <Navigate to="/login" />;    
}

export default PrivateRoute;
