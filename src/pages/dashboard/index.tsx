import CardLivro from "@/components/CardLivro";
import {MongoDB} from '../../lib/MongoDB'
import styles from './styles.module.scss'
import NavBar from "@/components/NavBar";
import MenuHamburguer from "@/components/MenuHamburguer";
import { useState } from "react";
import {getSession} from 'next-auth/react'
interface livros {  
    id:string,
  src:string,
    titulo:string,
    descricao:string,
    autor:string
}
interface props{
    role:string,
    livros: arrayLivros
}
interface arrayLivros extends Array<livros>{}

export default function Dashboard(props:props){
    const[isActived, setIsActived]= useState(false)
    
    return(
        <div className={styles.dashboardContainer}> 
        <div className={styles.containerCards}>

            <MenuHamburguer 
            role={props.role}
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

export async function getServerSideProps(context:any) {
    const session = await getSession(context)
   
    if(!session){
        
         return{
            redirect:{
                destination:'/',
                permanent:false
            }
         }   
        
    }
    
    const db = await MongoDB()
    const data = await db.collection('livros').find().toArray()
    
    if(session.user?.email?.includes('@prof.ce.gov.br')){
        return {props:{
            role:'professor',
            livros: JSON.parse(JSON.stringify(data))
        }}
    }
    if(session.user?.email?.includes('@aluno.ce.gov.br')){
        return {props:{
            role:'aluno',
            livros: JSON.parse(JSON.stringify(data))
        }}
    }
    return{
        redirect:{
            destination:'/',
            permanent:false
        }
    }
   
    
}