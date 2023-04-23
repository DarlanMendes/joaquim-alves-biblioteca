import { useState } from 'react';
import NavBar from '@/components/NavBar';
import MenuHamburguer from '@/components/MenuHamburguer';
import styles from './styles.module.scss';
import { getSession } from 'next-auth/react';
import avatar from '../../../public/assets/livroIMG.png'
import { useRouter } from 'next/router';
import axios from 'axios'
import Loading from '@/components/Loading';
import ConvertImageString from '../../lib/ConvertImageString'
interface props {
    role: string,

}


export default function CadastroAluno(props: props) {
    const [isActived, setIsActived] = useState(false);
    const [aluno, setAluno] = useState(
        { nome: '', serie: '', turma: '', turno: '', endereco: '', numero: '', bairro: '', telefone: '', email: '', img: `${avatar}` }
    )
    const[loading, setLoading]=useState(false)
    const router = useRouter()
    
   async function cadastrarAluno(){
   setLoading(true)
   const{nome, serie, turma, turno, endereco,numero,bairro,telefone,email,img}=aluno
    try{
        const response = await axios.post(`${ router.asPath.split('/')[0]}/api/colecaoAluno`,{
            nome,
            serie,
            turma,
            turno,
            endereco,
            numero,
            bairro,
            telefone,
            email,
            img
        })
        setLoading(false)
        alert(response.data.mensagem)
        setAluno({ nome: '', serie: '', turma: '', turno: '', endereco: '', numero: '', bairro: '', telefone: '', email: '', img: '/../public/assets/logoJA.png' })
    }catch(e){
        alert(e)
        setLoading(false)
    }
    console.log(props.role)
   } 

    function handleInputChange(evento: any) {
        const { name, value } = evento.target

        switch (name) {
            case 'serie':
                setAluno((prevState) => ({ ...prevState, [name]: value }))
                break
            case 'turma':
                setAluno((prevState) => ({ ...prevState, [name]: value }))
                break
            case 'turno':
                setAluno((prevState) => ({ ...prevState, [name]: value }))
                break
            default: setAluno((prevState) => ({ ...prevState, [name]: value }))
        }
    }
    async function handleImgImport(e: any) {
         const imagem = await ConvertImageString(e)
        
          setAluno((prevState)=>({...prevState,img:imagem}))  
    }

    return (
        <div>
            <MenuHamburguer
                role={props.role}
                isActived={isActived}
                setIsActived={setIsActived} />
            <NavBar setIsActived={setIsActived} />
            {loading?
            <Loading/>:
            <div className={styles.containerCadastro}>
                <h2>Cadastramento Aluno</h2>
                <img src={aluno?.img} alt='imagem aluno' />
                <input type='file' className={styles.inputImage} onChange={handleImgImport} />
                <div className={styles.seletores}>
                    <label> Série:
                        <select name='serie' value={aluno.serie} onChange={handleInputChange}>
                            <option></option>
                            <option> 1º ano</option>
                            <option> 2º ano</option>
                            <option> 3º ano</option>
                        </select>
                    </label>
                    <label> Turma:
                        <select name='turma' value={aluno.turma} onChange={handleInputChange}>
                            <option></option>
                            <option> A</option>
                            <option> B</option>
                            <option> C</option>
                            <option> D</option>
                            <option> E</option>
                        </select>
                    </label>
                    <label> Turno:
                        <select name='turno' value={aluno.turno} onChange={handleInputChange} >
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
                        <input type='text' name='nome' value={aluno.nome} onChange={handleInputChange} placeholder='Digite o nome completo' />
                    </label>
                    <label>
                        Endereço:
                        <input type='text' name='endereco' value={aluno.endereco} onChange={handleInputChange} placeholder='Digite o endereço ' />
                    </label>
                    <label>
                        N°:
                        <input type='text' name='numero' value={aluno.numero} onChange={handleInputChange} placeholder='Digite o  n°' />
                    </label>

                    <label>
                        Bairro:
                        <input type='text' name='bairro' value={aluno.bairro} onChange={handleInputChange} placeholder='Digite o bairro' />
                    </label>
                    <label>
                        Telefone:
                        <input type='text' name='telefone' value={aluno.telefone} onChange={handleInputChange} placeholder='Digite o telefone (85)9xxxx-xxxx' />
                    </label>
                    <label>
                        Email:
                        <input type='email' name='email' value={aluno.email} onChange={handleInputChange} placeholder='Digite o email' id='email' />
                    </label>

                </div>

                <button onClick={() => {cadastrarAluno()}}>Clique</button>





            </div>

            }
            
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