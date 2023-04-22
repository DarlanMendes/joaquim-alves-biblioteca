
import styles from './styles.module.scss';
import Image from 'next/image';


interface CardItems{
    src:string,
    titulo:string,
   descricao:string,
   autor:string
}
export default function CardLivro(props:CardItems){
    
    return(
        <div className={styles.mainContainer}>
            <Image src={props.src} height={100} width={100}sizes={'100%'} alt='livro'/>:
           
            
            <h3>{props.titulo}</h3>
            <p>{props.autor}</p>
        </div>
    )
}