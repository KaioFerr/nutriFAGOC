import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from "./ListFood.module.css"

import InputBusca from "../layout/InputBusca";
import FoodContainer from "../layout/FoodContainer";
import Header from '../layout/Header';

function ListFood(){

    const navigate = useNavigate()

    const [foods, setFoods] = useState([]);
    const [termoBusca, setTermoBusca] = useState("")

    useEffect(()=>{

      const token = localStorage.getItem("token");

      if(!token){
        navigate("/login", {state: {message: "Realize o login para acessar!",type:"error"}})
        return;
      }

      async function getFood(){
          try{
            const response = await fetch("http://localhost:8080/foods",{
            method:"GET",
            headers:{
              'Content-type' : "application/json",
              'Authorization' : `Bearer ${token}`
            },
            })

            if(!response.ok){
              navigate("/login", {state:{message:"Realize o login para acessar!", type:"error"}})
              return;
            }

            const data = await response.json()
            setFoods(data);

          }catch(err){
            navigate("login", {state:{message:"Erro ao conectar ao servidor!",type:"error"}})
          }
      }
        getFood();
      }, [navigate])
    
    const alimentoFiltro = foods.filter(food =>
      food.descricaoalimento.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(termoBusca.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    );

    function logout(){
      navigate("/login")
      localStorage.setItem("token", "");
    }

    return(
        <div className={styles.container}>
            <Header handleSubmit={logout}/>
            <InputBusca onSearch={setTermoBusca}/>
            <div className={styles.list}>
              {foods.length > 0 && alimentoFiltro.map(food=> (
              <FoodContainer 
              name={food.descricaoalimento} 
              energia={parseFloat(food.energiakj).toFixed(2)}
              calorias={parseFloat(food.energiakcal).toFixed(2)}
              proteinas={parseFloat(food.proteina).toFixed(2)} 
              carboidratos={parseFloat(food.carboidrato).toFixed(2)} 
              gorduras={parseFloat(food.lipideos).toFixed(2)} 
              colesterol={parseFloat(food.colesterol).toFixed(2)}
              fibras={parseFloat(food.fibraalimentar).toFixed(2)}
              sodio={parseFloat(food.sodio).toFixed(2)}
              potassio={parseFloat(food.potassio).toFixed(2)}
              key={food.id}
              />))}
            </div>
        </div>
    ) 
}

export default ListFood