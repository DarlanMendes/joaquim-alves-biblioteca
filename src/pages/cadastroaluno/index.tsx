import {useState} from 'react';
import NavBar from '@/components/NavBar';
import MenuHamburguer from '@/components/MenuHamburguer';
import styles from './styles.module.scss';
import {MongoDB} from '../../lib/MongoDB';
import {getSession} from 'next-auth/react'
export default function CadastroAluno(props){
    const[isActived, setIsActived]= useState(false)
    return(
        <div>
             <MenuHamburguer 
            role={props.role}
            isActived={isActived} 
            setIsActived={setIsActived}/>
            <NavBar setIsActived={setIsActived}/>
           <div className={styles.containerCadastro}>

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