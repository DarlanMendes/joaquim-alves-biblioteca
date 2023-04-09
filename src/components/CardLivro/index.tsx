import styles from './styles.module.scss';


interface CardItems{
    src:string,
    titulo:string,
   descricao:string,
}
export default function CardLivro(props:CardItems){
    return(
        <div className={styles.mainContainer}>
            <img src={props?.src?props.src:'/../public/assets/livroIMG.png'} height={100} width={100}sizes={'100%'} alt='livro'/>
            <h3>{props.titulo}</h3>
            <p>{props.descricao}</p>
        </div>
    )
}