import {useEffect, useState} from "react"
import { useNavigate, Link, useLocation} from "react-router-dom"

import styles from "./Login.module.css"
import Message from "../layout/Message";

function Login(){

    const navigate =  useNavigate();
    const location = useLocation()

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [alert, setAlert] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    useEffect(()=>{
        if(location.state && location.state.message && location.state.type){
            setMessage(location.state.message);
            setType(location.state.type)
            navigate(location.pathname, { replace: true });
        }
    },[location , navigate])

    async function login(){
        const user ={
            email: email,
            senha: senha
        }
        try{
            const response = await fetch("http://localhost:8080/login",{
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            })

            if(!response.ok){
                setAlert("Email e/ou senha inválidos!")
                return           
            }

            const data = await response.json();
            console.log(data);
            navigate("/");
            localStorage.setItem("user", data)

        }catch(err){
            console.log("Erro ao realizar login:", err);
            setAlert("Erro ao conectar ao servidor");
        }
    }

    return(
        <div className={styles.container}>
            {message && <Message type={type} msg={message}/>}
            <div className={styles.login}>
                <p className={styles.title}>LOGIN</p>
                <div className={styles.inputs}>
                    <label htmlFor="email">Email:</label>
                    <input name="email" id="email" className={styles.usuario} type="email" onChange={(e)=> setEmail(e.target.value)}></input>
                    <label htmlFor="senha">Senha:</label>
                    <input name="senha" id="senha" className={styles.senha} type="password"onChange={(e)=> setSenha(e.target.value)}></input>
                </div>
                <p className={styles.alert}>{alert}</p>
                <button onClick={login}>Entrar</button>
            </div>
            <div className={styles.cadastro}>
                <p>Não possui cadastro?</p>
                <Link to={"/cadastro"}>
                    <button>Cadastrar</button>
                </Link>
            </div>
        </div>
    )
}

export default Login