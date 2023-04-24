import styles from './styles.module.scss'
import { getSession } from 'next-auth/react'
import { MongoDB } from '@/lib/MongoDB'
import Header from '@/components/Header'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

interface alunos {
    bairro: string,
    email: string
    endereco: string
    img: string
    nome: string
    numero: string
    serie: string
    telefone: string
    turma: string
    turno: string,
    _id: string
}
interface alunosArray extends Array<alunos> { }
interface Props {
    role: string,
}

export default function listarAlunos(props: Props) {
    const router = useRouter()
    const [alunos, setAlunos] = useState<alunosArray>([])
    const[filtro,setFiltro]=useState('nome')
    const[busca,setBusca]=useState('')
    async function filtrar() {
        const alunosBuscados = await axios.post(`${router.asPath.split('/')[0]}/api/colecaoAluno`,{
            filtro:filtro,
            busca:busca
        })
        console.log(alunosBuscados)
        setAlunos(alunosBuscados.data)
    }
    return (
        <>
            <Header role={props.role} />
            <div className={styles.mainContainer}>
                <div className={styles.inputContainer}>
                    <input type='text' placeholder='Digite sua busca' onChange={(e)=>setBusca(e.target.value)}/>
                    <div className={styles.botaoContainer}>
                        <select onChange={(e)=>setFiltro(e.target.value)}>
                            <option value='nome'>Nome</option>
                            <option value='matricula'>Matricula</option>
                        </select>
                        <button onClick={()=>{filtrar()}}>Buscar</button>
                    </div>

                </div>
                {alunos.length>0? alunos.map((aluno) => (
                    <div className={styles.alunoContainer}>
                        <div className={styles.image}>
                            <img src={aluno.img} alt='' />
                        </div>

                        <div className={styles.dadosAluno}>
                            <h3>{aluno.nome}</h3>
                            <p>{aluno.serie}  {aluno.turma}</p>
                            <span>0553857083</span>
                            <button>
                                Editar
                            </button>
                        </div>
                    </div>

                )) : <div className={styles.naoEncontrado}> Faça sua busca para listar aqui os alunos.</div>}

            </div>
        </>


    )
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
               // alunos: JSON.parse(JSON.stringify(data)),

            }

        }
    }
    if (session.user?.email?.includes('@aluno.ce.gov.br')) {
        return {
            props: {
                role: 'aluno',
              //  alunos: JSON.parse(JSON.stringify(data)),


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