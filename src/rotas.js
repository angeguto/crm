import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Negocio from "./pages/negocio/negocio.jsx"
import Movimento from "./pages/Movimento/movimento.jsx"
import Registro from "./pages/registro/registro.jsx";
import Login from "./pages/login/login.jsx";
import PrivateRoute from "./components/private-route/private-route.jsx";

function Rotas(){
    return <BrowserRouter>
        <Routes>
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            } />

            <Route path="/" element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            } />

            <Route path="/negocios" element={
                <PrivateRoute>
                    <Negocio />
                </PrivateRoute>
            } />
            <Route path="/movimento" element={
                <PrivateRoute>
                    <Movimento />
                </PrivateRoute>
            } />
        </Routes>
    </BrowserRouter>
}

export default Rotas;