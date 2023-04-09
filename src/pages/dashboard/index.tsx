import CardLivro from "@/components/CardLivro";
import {MongoDB} from '../../lib/MongoDB'
import styles from './styles.module.scss'
import NavBar from "@/components/NavBar";
import MenuHamburguer from "@/components/MenuHamburguer";
import { useState } from "react";
interface livros {  
    id:string,
  src:string,
    titulo:string,
    descricao:string,
    autor:string
}
interface props{
    livros: arrayLivros
}
interface arrayLivros extends Array<livros>{}

export default function Dashboard(props:props){
    const[isActived, setIsActived]= useState(false)
    
    return(
        <div className={styles.dashboardContainer}> 
        <div className={styles.containerCards}>

            <MenuHamburguer 
            isActived={isActived} 
            setIsActived={setIsActived}/>


            <NavBar setIsActived={setIsActived}/>
       {props?.livros.map((livro,index)=>(
        <div key={index}>
            <CardLivro  titulo={livro.titulo} src={livro.src} descricao={livro.descricao}/>
        </div>
       ))}
        
        </div>
        </div>
    )
}

export async function getServerSideProps() {
    const db = await MongoDB()
    const data = await db.collection('livros').find().toArray()
    console.log(data)
    return {props:{
        livros: JSON.parse(JSON.stringify(data))
    }}
    
}