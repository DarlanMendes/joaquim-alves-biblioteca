import styles from './styles.module.scss';
import { signOut } from 'next-auth/react';
interface propsDetalhes{
    saudacao:string|undefined|null,
    isDetailed:boolean
}
export default function Detalhes(props:propsDetalhes) {
    return (
        <div className={styles.mainContainer}  style={props.isDetailed?{display:'flex'}:{display:'none'}}>
            <ul>
                <li> Olá, {props.saudacao}</li>
                <li>Meu Perfil</li>
                <li onClick={()=>{signOut()}}> Sair</li>
            </ul>
        </div>)
}