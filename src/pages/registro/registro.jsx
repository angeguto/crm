import "./registro.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api.js";

function Registro(){

    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    function RegistrarUsuario(){
        const params = {
            nome,
            email,
            senha
        };

        api.post("/usuarios/registro", params)
        .then((resp) => {

            if (resp.status == 201)
            {
                localStorage.setItem("id_usuario", resp.data.id_usuario);
                navigate("/dashboard");
            } else {
                setErro("Erro ao criar conta");
            }

        })
        .catch((err) => {
            if (err.response?.data.erro) {
                setErro(err.response.data.erro);
            } else {
                setErro("Erro ao criar conta");
            }
        })
    }

    return <div className="d-flex justify-content-center align-items-center content">
        <form className="form-signin">
            <div className="text-center">
                    <img className="mb-5" src={logo} alt=""  />
            </div>
            <h3 className="mb-3">Criar Conta</h3>

            <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" onChange={(e) => setNome(e.target.value)}/>
                <label for="floatingInput">Nome</label>
            </div>
            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" onChange={(e) => setEmail(e.target.value)} />
                <label for="floatingInput">E-mail</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" 
                        id="floatingPassword" onChange={(e) => setSenha(e.target.value)} />
                <label for="floatingPassword">Senha</label>
            </div>

            <button onClick={RegistrarUsuario} className="btn btn-primary w-100 py-2" type="button">Criar Conta</button>

            {
                erro.length > 0 ?
                <div class="alert alert-danger mt-4 text-center" role="alert">{erro}</div>                        
                : null
            }

            <div className="mt-5 text-center">
                    <Link to="/login">Já possuo uma conta.</Link>
            </div>

            <div className="text-center">
                <p className="mt-5 mb-3 text-secondary">Jornada Dev - 99 Coders</p>
            </div>    
        </form>
    </div>
}

export default Registro;