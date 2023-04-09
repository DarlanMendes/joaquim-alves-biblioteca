import { useSession} from "next-auth/react"
import { useRouter } from "next/router";
import styles from './styles.module.scss';
import {GiHamburgerMenu} from 'react-icons/gi';
import { isMobile } from 'react-device-detect';
import Detalhes from "../Detalhes";
import {useState} from 'react'
interface propsHamburguer{
    setIsActived: Function
}


export default function NavBar(props:propsHamburguer){
    const{data:session, status}=useSession();
    const router = useRouter()
   if(status==='unauthenticated'){
    router.push('/')
   }
   const[isDetailed, setIsDetailed] = useState(false);
   
    return( 
        <div className={styles.mainContainer}>
            <GiHamburgerMenu color="white"  onClick={()=>props.setIsActived(true)}/>
            <div className={styles.userContainer}>
                
                <img src={`${session?.user?.image}`} alt='imagem usuario' onClick={()=>setIsDetailed(!isDetailed)}/>
                
                <Detalhes 
                saudacao={isMobile?session?.user?.name?.substring(0,14):session?.user?.name}
                isDetailed={isDetailed}
                />
            </div>
        </div>
    )
}

