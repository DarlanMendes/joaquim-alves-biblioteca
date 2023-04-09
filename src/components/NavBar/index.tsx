import { useSession} from "next-auth/react"
import { useRouter } from "next/router";
import styles from './styles.module.scss';
import {GiHamburgerMenu} from 'react-icons/gi';

interface propsHamburguer{
    setIsActived: Function
}


export default function NavBar(props:propsHamburguer){
    const{data:session, status}=useSession();
    const router = useRouter()
   if(status==='unauthenticated'){
    router.push('/')
   }
   console.log(session)
    return( 
        <div className={styles.mainContainer}>
            <GiHamburgerMenu color="white"  onClick={()=>props.setIsActived(true)}/>
            <div className={styles.userContainer}>
                Olá, {session?.user?.name}
                <img src={`${session?.user?.image}`} alt='imagem usuario'/>
            </div>
        </div>
    )
}

