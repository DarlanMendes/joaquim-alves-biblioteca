import Image from "next/image";
import styles from './styles.module.scss';
import {SiGmail} from 'react-icons/si';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
export default function Aluno() {

    const {data:session, status} = useSession()
    const router = useRouter()
  
    
   
    if(status==='authenticated'){
        router.push('/dashboard')
    }
      
    
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