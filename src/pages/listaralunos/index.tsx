import styles from './styles.module.scss'
import { getSession } from 'next-auth/react'
import { MongoDB } from '@/lib/MongoDB'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'

interface alunos {
    bairro:string,
    email: string
    endereco:string
    img:string
    nome:string
    numero:string
    serie:string
    telefone:string
    turma:string
    turno:string,
    _id:string
}
interface alunosArray extends Array<alunos>{}
interface Props {
    role: string,
    alunos: alunosArray
}

export default function listarAlunos(props: Props) {
    console.log(props.alunos)
    const [alunos, setAlunos] = useState(props.alunos)
 
    return (
        <>
            <Header role={props.role} />
            <div className={styles.mainContainer}>
                <div className={styles.inputContainer}>
                    <input type='text' placeholder='Digite sua busca' />
                    <div className={styles.botaoContainer}>
                        <select>
                            <option value='nome'>Nome</option>
                            <option value='matricula'>Matricula</option>
                        </select>
                        <button>Buscar</button>
                    </div>

                </div>
                {alunos ? alunos.map((aluno) => (
                    <div className={styles.alunoContainer}>
                        <div className={styles.image}>
                            <img src={aluno.img} alt='' />
                        </div>

                        <div className={styles.dadosAluno}>
                            <h3>{aluno.nome}</h3>
                            <p>{aluno.serie}  {aluno.turma}</p>
                            <span>0553857083</span>
                            <button>Editar</button>
                        </div>
                    </div>

                )) : <> Nenhum aluno encontrado.</>}

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

    const { db } = await MongoDB()
    const data = await db.collection('alunos').find().toArray()

    if (session.user?.email?.includes('@prof.ce.gov.br')) {
        return {
            props: {
                role: 'professor',
                alunos: JSON.parse(JSON.stringify(data)),

            }

        }
    }
    if (session.user?.email?.includes('@aluno.ce.gov.br')) {
        return {
            props: {
                role: 'aluno',
                alunos: JSON.parse(JSON.stringify(data)),


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