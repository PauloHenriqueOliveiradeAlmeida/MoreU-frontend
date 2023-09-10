import { useFormik } from "formik";
import "./assets/styles/cadastroAtivos.scss";
import * as Yup from "yup";
import Ativos from "./types/ativos";
import api from "./services/api";
import { useNavigate } from "react-router-dom";

function AtualizarAtivos() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            nomeProduto: "",
            tipoProduto: "default",
            qntProduto: 0,
            valorPagoProduto: 0,
            dataCadastroProduto: "",
            descricaoProduto: ""
        },
        validationSchema: Yup.object({
            nomeProduto: Yup.string().max(60, "O nome deve ter no máximo 60 caracteres").required("Informação obrigatória"),
            tipo: Yup.string(),
            qntProduto: Yup.number().min(1, "Deve haver pelo menos uma unidade").required("Informação obrigatória"),
            valorPagoProduto: Yup.number().min(0, "O valor deve ser, no mínimo, zero").required("Informação obrigatória"),
            dataCadastroProduto: Yup.date().required("Informação obrigatória"),
            descricaoProduto: Yup.string().max(255, "A descrição deve ter no máximo 255 caracteres").required("Informação obrigatória")
        }),
        onSubmit: (values) => { atualizarAtivos(values) }
    });


    async function atualizarAtivos(data: Ativos) {
        try {
            const response = await api.put("/ativos", data);

            if (response.status === 200) {
                navigate("/dashboard");
            }
        } catch (err) {
            alert("Houve um erro ao atualizar o registro, tente novamente mais tarde");
        }
    }


    return (

        <div className="background visualizer-container update-container">
            <form className="cadastro-ativos" onSubmit={formik.handleSubmit}>
                <h2>Atualizar Ativos</h2>

                <div className="nome">
                    <label htmlFor="nomeProduto">Nome do produto:</label>
                    <input type="text" id="nomeProduto" value={formik.values.nomeProduto} onChange={formik.handleChange} onBlur={formik.handleBlur} required />

                    {formik.touched.nomeProduto && formik.errors.nomeProduto ? (
                        <div className="message-error">{formik.errors.nomeProduto}</div>
                    ) : <div className="message-error"></div>}
                </div>

                <div className="classificacao">
                    <label htmlFor="tipoProduto">Classificação:</label>
                    <select id="tipoProduto" name="tipoProduto" value={formik.values.tipoProduto} onChange={formik.handleChange} onBlur={formik.handleBlur} required >
                        <option value="default" disabled>Selecione uma Classificação</option>
                        <option value="p">Periféricos</option>
                        <option value="d">Decorações</option>
                        <option value="f">Móveis</option>
                        <option value="e">Eletrônicos</option>
                    </select>

                    {formik.touched.tipoProduto && formik.errors.tipoProduto ? (
                        <div className="message-error">{formik.errors.tipoProduto}</div>
                    ) : <div></div>}
                </div>

                <div className="quantidade">
                    <label htmlFor="qntProduto">Quantidade do produto:</label>
                    <input type="number" min={1} id="qntProduto" value={formik.values.qntProduto} onChange={formik.handleChange} onBlur={formik.handleBlur} required />

                    {formik.touched.qntProduto && formik.errors.qntProduto ? (
                        <div className="message-error">{formik.errors.qntProduto}</div>
                    ) : <div></div>}
                </div>

                <div className="valor">
                    <label htmlFor="valorPagoProduto">Valor pago por produto:</label>
                    <input type="number" id="valorPagoProduto" min={0} step={0.01} value={formik.values.valorPagoProduto} onChange={formik.handleChange} onBlur={formik.handleBlur} required />

                    {formik.touched.valorPagoProduto && formik.errors.valorPagoProduto ? (
                        <div className="message-error">{formik.errors.valorPagoProduto}</div>
                    ) : <div></div>}
                </div>

                <div className="data">
                    <label htmlFor="dataCadastroProduto">Data de entrega:</label>
                    <input type="date" id="dataCadastroProduto" value={formik.values.dataCadastroProduto} onChange={formik.handleChange} onBlur={formik.handleBlur} required />

                    {formik.touched.dataCadastroProduto && formik.errors.dataCadastroProduto ? (
                        <div className="message-error">{formik.errors.dataCadastroProduto}</div>
                    ) : <div></div>}
                </div>

                <div className="descricao">
                    <label htmlFor="descricaoProduto">Descrição do Produto:</label>
                    <textarea id="descricaoProduto" cols={30} rows={10} value={formik.values.descricaoProduto} onChange={formik.handleChange} onBlur={formik.handleBlur} required ></textarea>

                    {formik.touched.descricaoProduto && formik.errors.descricaoProduto ? (
                        <div className="message-error">{formik.errors.descricaoProduto}</div>
                    ) : <div></div>}
                </div>

                <button type="submit" className="botao"><span>Atualizar</span></button>
            </form>
        </div>
    )
}

export default AtualizarAtivos;