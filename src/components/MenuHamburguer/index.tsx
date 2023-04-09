import Link from "next/link";
import styles from './styles.module.scss'
interface propsHamburguer{
    isActived:boolean,
    setIsActived:Function
}

export default function MenuHamburguer(props:propsHamburguer){
    
    return(
        <div className={styles.hamburguerContainer} style={props.isActived?{display:'flex'}:{display:'none'}}>
            <ul>
                <li>
                    <Link href='/dashboard'> Home</Link>
                </li>
                <li>
                    <Link href='/meusalugueis'> Meus Alugueis</Link>
                </li>
                <li>
                    <Link href='/cadastroaluno'> Cadastrar Aluno</Link>
                </li>
                <li>
                    <Link href='/cadastrolivro'> Cadastrar Livro</Link>
                </li>
            </ul>
            <div className={styles.rightSide} onClick={()=>props.setIsActived(false)}>

            </div>
        </div>
    )
}