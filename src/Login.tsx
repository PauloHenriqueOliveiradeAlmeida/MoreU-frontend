import "./assets/styles/forms.scss";

function Login() {
    return (
        <div className="background">
            <form>
                <h2>Faça seu Login</h2>
                <div>
                    <label htmlFor="">Nome:</label>
                    <input type="text" />
                </div>
                

                <div>
                    <label htmlFor="">Senha:</label>
                    <input type="text" />
                </div>

                <button type="submit"><span>Fazer Login</span></button>
            </form>

            <div className="details">
                <h1>MoreÜ</h1>
                <img src="login.svg" alt="Imagem de Login" />
            </div>
        </div>
    );
}

export default Login;