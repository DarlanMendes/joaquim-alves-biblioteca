import {useState} from 'react';
import NavBar from '@/components/NavBar';
import MenuHamburguer from '@/components/MenuHamburguer';
import styles from './styles.module.scss';


interface props{
    role:string,
    
}


export default function CadastroAluno(props:props){
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
    
   
    
    if(session.user?.email?.includes('@prof.ce.gov.br')){
        return {props:{
            role:'professor'
        }}
    }
    if(session.user?.email?.includes('@aluno.ce.gov.br')){
        return {props:{
            role:'aluno',
            
        }}
    }
    return{
        redirect:{
            destination:'/',
            permanent:false
        }
    }
   
    
}