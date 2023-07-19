import "./login.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api.js";

function Login(){

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    function ProcessaLogin(){

        setLoading(true);

        const params = {
            email,
            senha
        };

        api.post("/usuarios/login", params)
        .then((resp) => {
            setLoading(false);

            if (resp.status == 200)
            {
                localStorage.setItem("id_usuario", resp.data.id_usuario);
                navigate("/dashboard");
            } else {
                setErro("Erro ao realizar login");
            }

        })
        .catch((err) => {
            setLoading(false);

            if (err.response?.data.erro) {
                setErro(err.response.data.erro);
            } else {
                setErro("Erro ao realizar login");
            }
        })
    }

    return <div className="d-flex justify-content-center align-items-center content">
        <form className="form-signin">
            <div className="text-center">
                    <img className="md-5" src={logo} alt=""  />
            </div>
            <h3 className="mb-5">Login</h3>
           
            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" onChange={(e) => setEmail(e.target.value)} />
                <label for="floatingInput">E-mail</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" 
                        id="floatingPassword" onChange={(e) => setSenha(e.target.value)} />
                <label for="floatingPassword">Senha</label>
            </div>

            {
                loading ? 
                    <span className="btn btn-primary w-100 py-2 disabled">
                        <div class="spinner-border spinner-border-sm text-light me-2" role="status"></div>
                        Acessando...
                    </span>
                    
                : <button onClick={ProcessaLogin} className="btn btn-primary w-100 py-2" type="button">Acessar</button>
            }
            

            {
                erro.length > 0 ?
                <div class="alert alert-danger mt-4 text-center" role="alert">{erro}</div>                        
                : null
            }

            <div className="mt-5 text-center">
                    <Link to="/registro">Criar minha conta.</Link>
            </div>

            <div className="text-center">
                <p className="mt-5 mb-3 text-secondary">Jornada Dev - 99 Coders</p>
            </div>    
        </form>
    </div>
}

export default Login;