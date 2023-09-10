import { useFormik } from "formik";
import * as Yup from "yup";
import "./assets/styles/forms.scss";
import Clientes from "./types/clientes";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons/faLongArrowAltRight";
import phoneMask from "./utils/phoneMask";
import { useNavigate } from "react-router-dom";
import api from "./services/api";

function Cadastro() {
    const [formActualStep, setFormActualStep] = useState<number>(0);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            nome: "",
            email: "",
            password: "",
            contato: "",
            nomeEmpresa: ""
        },
        validationSchema: Yup.object({
            nome: Yup.string().max(60, "Deve ter no máximo 60 caracteres").required("Esta informação é obrigatória"),
            email: Yup.string().email("Você deve digitar um e-mail válido").required("Esta informação é obrigatória"),
            password: Yup.string().
                min(8, "A senha deve ter, no mínimo, 8 caracteres").
                matches(/[0-9]/, "A senha deve conter, pelo menos, um número").
                matches(/[a-z]/, "A senha deve conter, pelo menos, uma letra minúscula").
                matches(/[A-Z]/, "A senha deve conter, pelo menos, uma letra maiúscula").
                required("Esta informação é obrigatória"),

            contato: Yup.string().max(11, "O Número deve conter no máximo 11 caracteres").
                     matches(/(\d{2})(\d{5})(\d{4})/, "Deve ser um número de telefone válido").
                     required("Esta informação é obrigatória"),

            nomeEmpresa: Yup.string().max(80, "Deve ter no máximo 80 caracteres").required("Esta informação é obrigatória")
        }),
        onSubmit: (values) => { cadastrarCliente(values) }
    })

    const nextStep = () => {
        if (formik.values.nome && formik.values.nomeEmpresa) {
            setFormActualStep(formActualStep + 1)
        }
    }

    async function cadastrarCliente(data: Clientes) {
        try {
            const response = await api.post("/clientes", data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.data.created) {
                navigate("/dashboard");
            }
        }
        catch(err) {
            alert(`Infelizmente houve um erro ao realizar o cadastro, por favor,
            tente novamente mais tarde ou chame a assistência.`)
            
        } 
    }


    return (
        <div className="background">
            <form onSubmit={formik.handleSubmit}>
                <h2>Faça seu Cadastro</h2>
                {formActualStep === 0 ? (
                    <>
                        <div>
                            <label htmlFor="nome">Nome:</label>
                            <input type="text" id="nome" value={formik.values.nome} onChange={formik.handleChange} onBlur={formik.handleBlur} required />

                            {formik.touched.nome && formik.errors.nome ? (
                                <div className="message-error">{formik.errors.nome}</div>
                            ) : null}

                        </div>

                        <div>
                            <label htmlFor="nomeEmpresa">Nome da Empresa:</label>
                            <input type="text" id="nomeEmpresa" value={formik.values.nomeEmpresa} onChange={formik.handleChange} onBlur={formik.handleBlur} required />

                            {formik.touched.nomeEmpresa && formik.errors.nomeEmpresa ? (
                                <div className="message-error">{formik.errors.nomeEmpresa}</div>
                            ) : null}

                        </div>
                        <button onClick={nextStep}><span>Avançar <FontAwesomeIcon icon={faLongArrowAltRight}/></span></button>
                    </>
                ) : (
                    <>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} required />

                            {formik.touched.email && formik.errors.email ? (
                                <div className="message-error">{formik.errors.email}</div>
                            ) : null}

                        </div>


                        <div>
                            <label htmlFor="password">Senha:</label>
                            <input type="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} required />

                            {formik.touched.password && formik.errors.password ? (
                                <div className="message-error">{formik.errors.password}</div>
                            ) : null}

                        </div>

                        <div>
                            <label htmlFor="contato">Contato:</label>
                            <input type="tel" id="contato" value={phoneMask(formik.values.contato)} onChange={formik.handleChange} onBlur={formik.handleBlur} required />

                            {formik.touched.contato && formik.errors.contato ? (
                                <div className="message-error">{formik.errors.contato}</div>
                            ) : null}

                        </div>

                        <button type="submit"><span>Fazer Login</span></button>
                    </>
                )}

            </form>

            <div className="details waves-background">
                <h1>MoreÜ</h1>
                <img src="cadastro.svg" alt="Imagem de Login" />
            </div>
        </div>
    );
}

export default Cadastro;