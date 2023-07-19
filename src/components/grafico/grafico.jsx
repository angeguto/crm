import { Chart } from "react-google-charts";

function Grafico(props){
    
      const options = {
        legend: props.legenda ? {} : {position: "none"},
        hAxis: { format: "currency" },
        vAxis: { format: "currency" }
        
      }

      return <div className="card">
      <div className="card-header">
        {props.titulo}
      </div>
      <div className="card-body text-center">
          <Chart chartType={props.chartType}
                 data={props.dados}
                 focusTarget="category"
                 //subtitle= "Valor Total, Valor Cartão, Valor Pix, Valor Dinheiro"
                 //vAxis="format: currency"
                 width="100%"
                 height="350px"
                 //colors="#d95f02, #7570b3, #1b9e77"
                 chartLanguage="pt-BR"
                 options={options}
                 legendToggle={true} />
      </div>
  
    </div>
      
}

export default Grafico;