import { useEffect, useState } from "react";
import { Dock } from "react-dock";
import "./negocio-cad.css";
import api from "../../services/api.js";

function NegocioCad(props){

    const [show, setShow] = useState(false);
    const [operacao, setOperacao] = useState("");
    const [etapas, setEtapas] = useState([]);

    const [id_negocio, setIdNegocio] = useState(0);
    const [etapa, setEtapa] = useState("");
    const [descricao, setDescricao] = useState("");    
    const [empresa, setEmpresa] = useState("");
    const [contato, setContato] = useState("");
    const [fone, setFone] = useState("");
    const [email, setEmail] = useState("");
    const [valor, setValor] = useState(0);

    function ComboEtapa(){
        api.get("/etapas")
        .then((resp) => {
            setEtapas(resp.data);
        })
        .catch((err) => {
            setEtapas([]);
            alert("Erro ao montar combo");
        });
    }

    function SalvarDados(){

        const params = {
            id_usuario: localStorage.getItem("id_usuario"),
            etapa,
            descricao,
            empresa,
            contato,
            fone,
            email,
            valor
        };

        if (operacao === "new") {
            // NOVO REGISTRO........................
            api.post("/negocios", params)
            .then((resp) => {
                if (resp.status === 201) {
                    setShow(false);
                    props.onClose();
                } else {
                    alert("Erro ao inserir dados");
                }
            })
            .catch((err) => {
                setEtapas([]);
                alert("Erro ao inserir dados");
            });

        } else {
            // EDITAR REGISTRO EXISTENTE........................
            api.put("/negocios/" + id_negocio, params)
            .then((resp) => {
                if (resp.status === 200) {
                    setShow(false);
                    props.onClose();
                } else {
                    alert("Erro ao editar dados");
                }
            })
            .catch((err) => {
                setEtapas([]);
                alert("Erro ao editar dados");
            });
        }
        
    }

    useEffect(() => {        

        ComboEtapa();

        window.addEventListener('openSidebar', (param) => {

            if (param.detail.operacao === "new") {
                setIdNegocio(0);
                setEtapa("");
                setDescricao("");
                setEmpresa("");
                setContato("");
                setFone("");
                setEmail("");
                setValor(0);
            } else {
                api.get("/negocios/" + param.detail.id_negocio)
                .then((resp) => {
                    setIdNegocio(resp.data.id_negocio);
                    setEtapa(resp.data.etapa);
                    setDescricao(resp.data.descricao);
                    setEmpresa(resp.data.empresa);
                    setContato(resp.data.contato);
                    setFone(resp.data.fone);
                    setEmail(resp.data.email);
                    setValor(resp.data.valor);
                })
                .catch((err) => {                    
                    alert("Erro ao carregar dados");
                    console.log(err);
                });
            }

            setShow(true);
            setOperacao(param.detail.operacao);
        });
    }, []);

    return <Dock position="right"
                 isVisible={show}
                 fluid={false}
                 size={420}   
                 onVisibleChange={(visible) => {
                    setShow(visible);
                 }}         
                 >

        <div className="container-fluid h-100 pt-4 sidebar p-4 ">

            <h4 className="d-inline">
                {operacao === "edit" ? "Editar Negócio" : "Novo Negócio"}
            </h4>

            <div className="row tela-cad">
                <div className="col-12 mt-4">
                    <small className="text-secondary">Etapa</small>
                    <div className="form-control mb-2">
                    <select name="etapa" id="etapa" onChange={(e) => setEtapa(e.target.value)} value={etapa}>
                        <option value="">Selecione a etapa</option>

                        {
                            etapas.map((item) => {
                                return <option key={item.etapa} value={item.etapa}>{item.etapa}</option>
                            })
                        }
                        
                    </select>
                    </div>
                </div>

                <div className="col-12 mt-3">
                    <small className="text-secondary">Descrição</small>
                    <input type="text" className="form-control" onChange={(e) => setDescricao(e.target.value)} value={descricao} />
                </div>

                <div className="col-12 mt-3">
                    <small className="text-secondary">Empresa</small>
                    <input type="text" className="form-control" onChange={(e) => setEmpresa(e.target.value)} value={empresa} />
                </div>

                <div className="col-12 mt-3">
                    <small className="text-secondary">Contato</small>
                    <input type="text" className="form-control" onChange={(e) => setContato(e.target.value)} value={contato} />
                </div>

                <div className="col-12 mt-3">
                    <small className="text-secondary">Fone</small>
                    <input type="text" className="form-control" onChange={(e) => setFone(e.target.value)} value={fone} />
                </div>

                <div className="col-12 mt-3">
                    <small className="text-secondary">E-mail</small>
                    <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>

                <div className="col-12 mt-3">
                    <small className="text-secondary">Valor Estimado</small>
                    <input type="text" className="form-control" onChange={(e) => setValor(e.target.value)} value={valor} />
                </div>

            </div>

            <div className="row align-items-end footer">
                <div className="text-center">
                    <button className="btn btn-outline-primary me-3" onClick={() => setShow(false)}>Cancelar</button>
                    <button className="btn btn-primary" onClick={SalvarDados}>Salvar Dados</button>
                </div> 
            </div>

        </div>
        

    </Dock>
}

export default NegocioCad;