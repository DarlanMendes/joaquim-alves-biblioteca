import NavBar from "@/components/NavBar"
import { useState } from 'react'
import { getSession } from "next-auth/react"
import MenuHamburguer from "@/components/MenuHamburguer"
import styles from './styles.module.scss'
import ConvertImageString from "@/lib/ConvertImageString"
import axios from 'axios'
import { useRouter } from "next/router"
import Loading from "@/components/Loading"
import Image from "next/image"
interface propsLivro {
    role: string
}
export default function cadastrolivro(props: propsLivro) {
    const [isActived, setIsActived] = useState(false)
    const[livro, setLivro]=useState(
        {titulo:'',autor:'',descricao:'',src:'/../../../public/assets/livroIMG.png',registro:'',genero:'',editora:''}
    )
    const[loading, setLoading] = useState(false)
    const router = useRouter()
    function handleInput(e:any){
        const{name,value} = e.target;
        setLivro((prevState)=>({...prevState,[name]:value}))
    }
    async function handleImageLivro(e:any){
        const imagem = await ConvertImageString(e)
        setLivro((prevState)=>({...prevState,src:imagem}))
    }
    async function salvarLivro(){
       setLoading(true)
        const response = await axios.post(`${router.asPath.split('/')[0]}/api/colecaoLivro`,{
            titulo:livro.titulo,
            autor:livro.autor,
            descricao:livro.descricao,
            src:livro.src,
            registro:livro.registro,
            genero:livro.genero,
            editora:livro.editora
        })
        console.log(response.data)
        setLoading(false)
    }
    return (
        <div>
            <MenuHamburguer
                role={props.role}
                isActived={isActived}
                setIsActived={setIsActived} />
            <NavBar setIsActived={setIsActived} />
           {loading? <Loading/>:
            <div className={styles.containerCadastro}>
                <h1>Cadastro livro</h1>
                <div className={styles.inputContainer}>
                    <Image src={livro.src} width={100} height={100}alt="imagem do livro" />
                    <input type="file" className={styles.inputFile} onChange={handleImageLivro}/>
                    <div>
                        <input type='text' placeholder="Digite o título do livro" name='titulo' onChange={handleInput}/>
                        <input type='text' placeholder="Digite o autor do livro" name='autor' onChange={handleInput}/>
                        <input type='text' placeholder="Digite o Nº de registro" name='registro' onChange={handleInput}/>
                        <input type='text' placeholder="Digite o gênero" name='genero' onChange={handleInput}/>
                        <input type='text' placeholder="Digite a editora" name='editora' onChange={handleInput}/>
                        <textarea placeholder="Digite a descrição do livro" name='descricao' onChange={handleInput}/>
                    </div>
                    <button onClick={()=>{salvarLivro()}}>Salvar</button>
                </div>
            </div>}

        </div>)
}
export async function getServerSideProps(context: any) {
    const session = await getSession(context)


    if (!session) {

        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }

    }



    if (session.user?.email?.includes('@prof.ce.gov.br')) {
        return {
            props: {
                role: 'professor',
            }
        }
    }
    if (session.user?.email?.includes('@aluno.ce.gov.br')) {
        return {
            props: {
                role: 'aluno',

            }
        }
    }
    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }


}