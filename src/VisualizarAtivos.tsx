import { faEdit, faPlusSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./assets/styles/visualizarAtivos.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "./services/api";
import Ativos from "./types/ativos";
import { useEffect, useState } from "react";
import DateMask from "./utils/dateMask";
import MoneyMask from "./utils/moneyMask";
import { Link, useNavigate } from "react-router-dom";
import checkType from "./utils/checkType";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

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

    try {
      const response = await api.get("/ativos/");
      return await response.data;
    }
    catch(err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 500) {
          toast.error("Erro no servidor, contacte os desenvolvedores imediatamente", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "colored",
        });
        }
      }
    }
  }

  const deletarAtivos = async (id: number) => {
    try {
      const response = await api.delete(`/ativos/${id}`);

      if (response.status == 200) {
        insertDatasInTable((await api.get("/ativos/")).data);
      }
    }
    catch(err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 500) {
          toast.error("Erro no servidor, contacte os desenvolvedores imediatamente", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "colored",
        });
        }
      }
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
  if (datas.length) {
    datas.forEach((data) => {
      datasArray.push(
        <tr key={`row-${data.id}`}>
          <td className="data-cadastro" key={`data-cadastro-${data.id}`}>{DateMask(data.dataCadastroProduto)}</td>
          <td className="nome-produto" key={`nome-produto-${data.id}`}>{data.nomeProduto}</td>
          <td className="tipo-produto" key={`tipo-produto-${data.id}`}>{checkType(data.tipoProduto)}</td>
          <td className="qnt-produto" key={`qnt-produto-${data.id}`}>{data.qntProduto} peças</td>
          <td className="valor-produto" key={`valor-produto-${data.id}`}>{MoneyMask(data.valorPagoProduto)}</td>
          <td className="actions" key={`acao-${data.id}`}>
            <FontAwesomeIcon icon={faEdit} className="edit" key={`edit-${data.id}`} onClick={() => navigate("atualizar", {state: {id: data.id}})}/>
            <FontAwesomeIcon icon={faTrash} key={`delete-${data.id}`} onClick={() => deletarAtivos(data.id!)}/>
          </td>
        </tr>
      );

      setDataComponent(datasArray);
    });
  }
  else {
    datasArray.push(
      <tr key="row-1" className="ativos-vazio" onClick={() => navigate("registrar")}>
        <td colSpan={5} key="data-1">Você ainda não cadastrou nenhum ativo!<br/>
          <FontAwesomeIcon icon={faPlusSquare} key="icon-1"/><br/>
          <span key="span-1">Clique para cadastrar um novo ativo, ou acesse o menu</span>
        </td>
      </tr>
    );

    setDataComponent(datasArray)
  }
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

    <Link to="/relatorio" state={databaseDatas} className="gerar-relatorio"><span>Gerar Relatório</span></Link>
  </div>
);
}

export default VisualizarAtivos;