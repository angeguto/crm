import Menu from "../../components/menu/menu.jsx";
//import Busca from "../../components/busca/busca.jsx";
import Indicador from "../../components/indicador/indicador.jsx";
import Grafico from "../../components/grafico/grafico.jsx";
import { useEffect, useState } from "react";
import api from "../../services/api.js";

function Movimento(){

    const [dadosIndicadores, setDadosIndicadores] = useState({
        "valor_total_mes": 0,
        "valor_total_dia": 0,
        "valor_cartao_mes": 0,
        "valor_cartao_dia": 0,
        "valor_dinheiro_mes": 0,
        "valor_dinheiro_dia": 0,
        "valor_pix_mes": 0,
        "valor_pix_dia": 0,
    });

    //const [dadosMensal, setDadosAnual] = useState([["a", "b", "c", "d", "e", "f"], [0, 0, 0, 0, 0, 0]]);
   const [dadosMensal, setDadosAnual] = useState([["Data", "Valor Total", "Valor Cartao", "valor_cartao_dia", "valor_dinheiro_mes", "valor_dinheiro_dia", "valor_pix_mes", "valor_pix_dia"], [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00]]);

    
    

    function MontarIndicadores(){
        
        api.get("/movimento/movimento")
        .then((resp) => {
            setDadosIndicadores(resp.data);
        })
        .catch((err) => {
            setDadosIndicadores({
                "valor_total_mes": 0,
                "valor_total_dia": 0,
                "valor_cartao_mes": 0,
                "valor_cartao_dia": 0,
                "valor_dinheiro_mes": 0,
                "valor_dinheiro_dia": 0,
                "valor_pix_mes": 0,
                "valor_pix_dia": 0,
            });
           alert("Erro ao carregar indicadores");
        });
    }

    function MontarGrafAnualx(){
        
        api.get("/movimento/movimentoGrafico")
        .then((resp) => {
            setDadosAnual(resp.data);
        })
        .catch((err) => {
            setDadosAnual([[], []]);
            alert("Erro ao carregar gráfico");
        });
        
    }

    function MontarMovimento(){
        MontarIndicadores();
        MontarGrafAnualx();
    }

    useEffect(() => { 
        const timer = setTimeout(() => {
            MontarMovimento();
        }, 8000);       
        return () => {
            clearTimeout(timer);
        }
    }, );


    return <>
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
                    <Menu page="movimento" />
                </div>

                <div className="col py-3 me-3">
                    
                    
                    <div className="d-flex justify-content-between"> 
                        <h1>Movimento</h1>
                        <button onClick={MontarMovimento} className="btn btn-primary ms-4">Atualizar</button>
                    </div>

                    <div className="row">
                        <div className="col-md-3 mt-4">
                            <Indicador titulo="Total de venda no mês"
                                       valor={new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(dadosIndicadores.valor_total_mes)}
                                       rodape={``} />
                        </div>                    

                        <div className="col-md-3 mt-4">
                            <Indicador titulo="Total em dinheiro no mês"
                                      
                                       valor={new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(dadosIndicadores.valor_dinheiro_mes)}
                                       rodape={``}/>
                        </div>

                        <div className="col-md-3 mt-4">
                            <Indicador titulo="Total em cartão no Mês"
                                       rodape={``}
                                       valor={new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(dadosIndicadores.valor_cartao_mes)} />
                        </div>

                        <div className="col-md-3 mt-4">
                            <Indicador titulo="Total em pix no mês"
                                       rodape={``}
                                       valor={new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(dadosIndicadores.valor_pix_mes)} />
                        </div>

                        <div className="col-md-3 mt-4">
                            <Indicador titulo="Total de venda no dia"
                                       valor={new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(dadosIndicadores.valor_total_dia)}
                                       rodape={``} />
                        </div>                    

                        <div className="col-md-3 mt-4">
                            <Indicador titulo="Total em dinheiro no dia"
                                      
                                       valor={new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(dadosIndicadores.valor_dinheiro_dia)}
                                       rodape={``}/>
                        </div>

                        <div className="col-md-3 mt-4">
                            <Indicador titulo="Total em cartão no dia"
                                       rodape={``}
                                       valor={new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(dadosIndicadores.valor_cartao_dia)} />
                        </div>

                        <div className="col-md-3 mt-4">
                            <Indicador titulo="Total em pix no dia"
                                       rodape={``}
                                       valor={new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(dadosIndicadores.valor_pix_dia)} />
                        </div>

                        <div className="col-12 mt-5">
                            <Grafico titulo="Vendas Mensal"
                                     chartType="Bar"
                                     legenda = "top"
                                     dados={dadosMensal}                                     
                                      />
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </>
}

export default Movimento;