import { useState } from 'react';
import NavBar from '@/components/NavBar';
import MenuHamburguer from '@/components/MenuHamburguer';
import styles from './styles.module.scss';
import { getSession } from 'next-auth/react';

interface props {
    role: string,

}


export default function CadastroAluno(props: props) {
    const [isActived, setIsActived] = useState(false)
    return (
        <div>
            <MenuHamburguer
                role={props.role}
                isActived={isActived}
                setIsActived={setIsActived} />
            <NavBar setIsActived={setIsActived} />
            <div className={styles.containerCadastro}>
                <h2>Cadastramento Aluno</h2>
                <img src='' alt=''/>
                <div className={styles.seletores}>
                    <label> Série:
                        <select>
                            <option></option>
                            <option> 1º ano</option>
                            <option> 2º ano</option>
                            <option> 3º ano</option>
                        </select>
                    </label>
                    <label> Turma:
                        <select>
                            <option></option>
                            <option> A</option>
                            <option> B</option>
                            <option> C</option>
                            <option> D</option>
                            <option> E</option>
                        </select>
                    </label>
                    <label> Turno:
                        <select >
                            <option></option>
                            <option> Manhã</option>
                            <option> Tarde</option>
                            <option> Noite</option>
                        </select>
                    </label>
                </div>
                <div className={styles.containerInput}>
                    <label>
                        Nome:
                        <input type='text' placeholder='Digite o nome completo' />
                    </label>
                    <label>
                        Endereço:
                        <input type='text' placeholder='Digite o endereço' />
                    </label>
                    <label>
                        Bairro:
                        <input type='text' placeholder='Digite o bairro' />
                    </label>

                </div>







            </div>
        </div>
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
                role: 'professor'
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