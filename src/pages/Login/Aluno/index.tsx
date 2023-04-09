import Image from "next/image";
import styles from './styles.module.scss';
import {SiGmail} from 'react-icons/si';
import { signIn } from "next-auth/react"


import { getSession } from "next-auth/react";
export default function Aluno() {

    return (
        <div className={styles.mainContainer}>
            <h1>Biblioteca Joaquim Alves</h1>
            <div className={styles.logo}>
                <Image src='/../public/assets/logoJA.png' alt='logoJA' width={170} height={160} style={{ objectFit: 'cover' }}></Image>
            </div>
            <span>Somente alunos cadastrados podem ter acesso</span>
            <button onClick={() => signIn('google')}>
                 Acesso com 
                 <SiGmail color="red" 
                 style={{backgroundColor:'white',
                 border:'1px solid black',
                 padding:'2px 3px'}}/>
                  Gmail
                  </button>
        </div>
    )
}
export  async function getServerSideProps(context:any){
    //const {data:session, status} = useSession()
    const session = await getSession(context)
   
    if(session){
        if(session.user?.email?.includes('@prof.ce.gov.br')||session.user?.email?.includes('@aluno.ce.gov.br')){
         return{
            redirect:{
                destination:'/dashboard',
                permanent:false
            }
         }   
        }
    }
    return{props:{authenticated:false}}

    }

