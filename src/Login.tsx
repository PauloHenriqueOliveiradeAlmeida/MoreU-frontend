import { useFormik } from "formik";
import * as Yup from "yup";
import "./assets/styles/forms.scss";
import api from "./services/api";
import Clientes from "./types/clientes";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "./contexts/Authentication";

function Login() {
    const navigate = useNavigate()
    const { setToken } = UseAuth() || {};

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Você deve digitar um e-mail válido").required("Esta informação é obrigatória"),
            password: Yup.string().required("Esta informação é obrigatória")
        }),
        onSubmit: (values) => { handleSubmit(values) }
    })

    async function handleSubmit(data: Clientes) {
        try {
            const request = await api.post("/clientes/login", data);

            if (request.status == 200) {
                if (setToken != undefined) {
                    setToken(request.data.token);
                    navigate("/dashboard");
                }
            }
        }
        catch(err) {
            alert(`Infelizmente houve um erro ao realizar o login, por favor,
tente novamente mais tarde ou chame a assistência.`)
        }
    }
    

    return (
        <div className="background">
            <form onSubmit={formik.handleSubmit}>
                <h2>Faça seu Login</h2>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
                    
                    {formik.touched.email && formik.errors.email ? (
                        <div className="message-error">{formik.errors.email}</div>
                    ) : null}

                </div>
                

                <div>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
                    
                    {formik.touched.password && formik.errors.password ? (
                        <div className="message-error">{formik.errors.password}</div>
                    ) : null}

                </div>

                <button type="submit"><span>Fazer Login</span></button>

                <a href="/cadastro">Não tem conta? Cadastre-se agora</a>
            </form>

            <div className="details">
                <h1>MoreÜ</h1>
                <img src="login.svg" alt="Imagem de Login" />
            </div>
        </div>
    );
}

export default Login;
