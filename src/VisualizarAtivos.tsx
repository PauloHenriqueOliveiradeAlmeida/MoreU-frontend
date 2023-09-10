import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./assets/styles/visualizarAtivos.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "./services/api";
import Ativos from "./types/ativos";
import { useEffect, useState } from "react";
import DateMask from "./utils/dateMask";
import MoneyMask from "./utils/moneyMask";
import { useNavigate } from "react-router-dom";

function VisualizarAtivos() {
  const navigate = useNavigate();
  const [dataComponent, setDataComponent] = useState<JSX.Element[]>();
  const [databaseDatas, setDatabaseDatas] = useState<Ativos[]>([]);

  const [filters] = useState({
    dataCadastroProduto: "",
    nomeProduto: "",
    tipoProduto: ""
  });

  useEffect(() => {
    async function getDatas() {
      const data = await buscarAtivos();
      setDatabaseDatas(data);
      insertDatasInTable(data);
    }

    getDatas();
  }, []);

  async function buscarAtivos() {
    const response = await api.get("/ativos");
    return await response.data;
  }

  const deletarAtivos = async (id: number) => {
    try {
      const response = await api.delete(`/ativos/${id}`);

      if (response.data) {
        insertDatasInTable((await api.get("/ativos")).data);
      }
    }
    catch(err) {
      console.log(err);
      alert("Houve um erro ao deletar, por favor, tente novamente mais tarde");
    }
  }

  const clearFilter = () => {
    filters.dataCadastroProduto = "";
    filters.nomeProduto = "";
    filters.tipoProduto = "";

    filterDatas();
  }

  function setFilter(value: string, type: string) {
    switch (type) {
      case "date":
        filters.dataCadastroProduto = value;
        break;

      case "name":
        filters.nomeProduto = value;
        break;

      case "type":
        filters.tipoProduto = value;
        break;
    }

    filterDatas();
  }

  function filterDatas() {
    let filtered;

    if (filters.dataCadastroProduto && !filters.nomeProduto && !filters.tipoProduto) {

      filtered = databaseDatas.filter((data) => {
        return data.dataCadastroProduto.includes(filters.dataCadastroProduto);
      });
    }

    else if (filters.nomeProduto && filters.dataCadastroProduto && !filters.tipoProduto) {

      filtered = databaseDatas.filter((data) => {
        return data.nomeProduto.toLowerCase().includes(filters.nomeProduto.toLowerCase()) && data.dataCadastroProduto.includes(filters.dataCadastroProduto);
      });
    }

    else if (filters.tipoProduto && filters.dataCadastroProduto && !filters.nomeProduto) {

      filtered = databaseDatas.filter((data) => {
        return data.tipoProduto.includes(filters.tipoProduto) && data.dataCadastroProduto.includes(filters.dataCadastroProduto);
      });
    }

    else if (filters.tipoProduto && !filters.dataCadastroProduto && filters.nomeProduto) {

      filtered = databaseDatas.filter((data) => {
        return data.tipoProduto.includes(filters.tipoProduto) && data.dataCadastroProduto.includes(filters.dataCadastroProduto);
      });
    }

    else if (!filters.dataCadastroProduto && filters.nomeProduto && !filters.tipoProduto) {

      filtered = databaseDatas.filter((data) => {
        return data.nomeProduto.toLowerCase().includes(filters.nomeProduto.toLowerCase());
      });
    }

    else if (!filters.dataCadastroProduto && !filters.nomeProduto && filters.tipoProduto) {

      filtered = databaseDatas.filter((data) => {
        return data.tipoProduto.includes(filters.tipoProduto);
      });
    }

    else {
      filtered = databaseDatas.filter((data) => {
        return data.tipoProduto.includes(filters.tipoProduto) && data.dataCadastroProduto.includes(filters.dataCadastroProduto) && data.nomeProduto.toLowerCase().includes(filters.nomeProduto);
      });
    }

    insertDatasInTable(filtered);

  }

function insertDatasInTable(datas: Ativos[]) {
  const datasArray: JSX.Element[] = [];
  datas.forEach((data, index) => {
    datasArray.push(
      <tr>
        <td className="data-cadastro" key={`data-cadastro-${index}`}>{DateMask(data.dataCadastroProduto)}</td>
        <td className="nome-produto" key={`nome-produto-${index}`}>{data.nomeProduto}</td>
        <td className="tipo-produto" key={`tipo-produto-${index}`}>{data.tipoProduto}</td>
        <td className="qnt-produto" key={`qnt-produto-${index}`}>{data.qntProduto} peças</td>
        <td className="valor-produto" key={`valor-produto-${index}`}>{MoneyMask(data.valorPagoProduto)}</td>
        <td className="actions" key={`acao-${index}`}>
          <FontAwesomeIcon icon={faEdit} className="edit" key={`edit-${index}`} onClick={() => navigate("atualizar")}/>
          <FontAwesomeIcon icon={faTrash} key={`delete-${index}`} onClick={() => deletarAtivos(data.id!)}/>
        </td>
      </tr>
    );

    setDataComponent(datasArray);
  })
}

return (
  
  <div className="background visualizer-container">
    <div className="filter-container">
      <div className="data">
        <label htmlFor="date">Data:</label>
        <input type="date" id="date" onChange={(e) => setFilter(e.target.value, "date")} />
      </div>

      <select name="classification" className="tipo" defaultValue="default" onChange={(e) => setFilter(e.target.value, "type")}>
        <option value="default" disabled>Filtrar por</option>
        <option value="p">Periféricos</option>
        <option value="d">Decorações</option>
        <option value="f">Móveis</option>
        <option value="e">Eletrônicos</option>
      </select>
      <input type="text" placeholder="Nome do produto" className="busca" onChange={(e) => setFilter(e.target.value, "name")} />

      <button className="limpar-busca" onClick={clearFilter}><span>Limpar busca</span></button>
    </div>
    <div className="table-container">

      <table>
        <thead>
          <tr>
            <th>Data:</th>
            <th>Nome:</th>
            <th>Class.:</th>
            <th>Quant.:</th>
            <th>Preço:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            dataComponent
          }
        </tbody>
      </table>
    </div>

    <button className="gerar-relatorio"><span>Gerar Relatório</span></button>
  </div>
);
}

export default VisualizarAtivos;