import {useState } from "react";
import {useNavigate} from 'react-router-dom'

import styles from "./Cadastro.module.css"

function Cadastro(){

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");
    const [alerta, setAlerta] = useState("");

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      };

    function validarSenha(senha) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return regex.test(senha);
    }
    
    async function cadastrar(e){
        setAlerta("");
        e.preventDefault()
        if(nome === "" || email === "" || senha === "" || confSenha === ""){
            setAlerta("Preencha todos os campos!")
        }else if(nome.length <= 7){
            setAlerta("Insira seu nome completo")
        }else if(!validarEmail(email)){
            setAlerta("Insira um email válido!")
        }else if(senha !== confSenha){
            setAlerta("As senhas são diferentes!")
        }else if(!validarSenha(senha)){
            setAlerta("A senha deve conter pelo menos: 8 digitos, uma letra minúscula e uma maiuscula!")
        }else {
            const user ={
                nome: nome,
                email: email,
                senha: senha
            }
            try{
                const response = await fetch("http://localhost:8080/users", {
                    method: "POST",
                    headers:{
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(user),
                })

                const data = await response.json();

                if(response.status === 409){
                    setAlerta("Email já cadastrado");
                    return;
                }else if(!response.ok){
                    setAlerta("Erro ao cadastrar usuário");
                    return;
                }

                
                navigate("/login", {state: {message: "Usuário criado com sucesso!",type:"success"}});
                console.log(data);
                
            } catch(err){
                console.log(err);
                setAlerta("Erro ao conectar ao servidor!")
            }

        }
    }

    const back = ()=>{
        navigate("/login")
    }

    return(
        <div className={styles.main}>
            <button className={styles.back} onClick={back}>Voltar</button>
            <div className={styles.container}>
                <h1>Realize seu cadastro:</h1>
                <form>
                    <section>
                        <label htmlFor="nome">Insira seu nome completo:</label>
                        <input type="text" name="nome" id="nome" onChange={(e)=>{setNome(e.target.value)}}/>
                    </section>
                    <section>
                        <label htmlFor="email">Insira seu melhor email:</label>
                        <input type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} />
                    </section>
                    <section>
                        <label htmlFor="senha">Insira sua senha:</label>
                        <input type="password" name="senha" id="senha" onChange={(e)=>{setSenha(e.target.value)}}/>
                    </section>
                    <section>
                        <label htmlFor="confSenha">Confirme sua senha:</label>
                        <input type="password" name="confSenha" id="confSenha" onChange={(e)=>{setConfSenha(e.target.value)}}/>
                    </section>
                    <p className={styles.alert}>{alerta}</p>
                    <button onClick={cadastrar}>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Cadastro;