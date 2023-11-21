interface Auth {
    token: string | undefined,
    Login: (data: Clientes) => Promise<boolean>,
    Logout: () => void

}

export default Auth;