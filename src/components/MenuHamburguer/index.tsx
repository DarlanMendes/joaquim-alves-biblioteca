import Link from "next/link";
import styles from './styles.module.scss';

interface propsHamburguer {
    role:string,
    isActived: boolean,
    setIsActived: Function,
    
}
export default function MenuHamburguer(props: propsHamburguer) {
    
    return (
        <div className={styles.hamburguerContainer} style={props.isActived ? { display: 'flex' } : { display: 'none' }}>
            <ul onClick={()=>props.setIsActived(false)}>
                <li>
                    <Link href='/dashboard'> Home</Link>
                </li>
                <li>
                    <Link href='/meusalugueis'> Meus Alugueis</Link>
                </li>
                {props?.role === 'professor' &&
                    <>
                        <li>
                            <Link href='/cadastroaluno'> Cadastrar Aluno</Link>
                        </li>
                        <li>
                            <Link href='/cadastrolivro'> Cadastrar Livro</Link>
                        </li>
                        <li>
                            <Link href='/listaralunos'> Listar Alunos</Link>
                        </li>
                    </>

                }

            </ul>
            <div className={styles.rightSide} onClick={() => props.setIsActived(false)}>

            </div>
        </div>
    )
}
