// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoDB } from '../../../lib/MongoDB'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    
    if (req.method === 'GET') {
        const { db } = await MongoDB();
        const alunos = db.collection('alunos');
       
        res.status(200).json({ mensagem: 'Olá' })
    }

    if (req.method === 'POST') {
        const { db } = await MongoDB();
        const alunos = db.collection('alunos');
        const {busca,filtro} = req.body
        console.log()
        if(filtro){
            const alunosBuscado = await alunos.find({ [filtro]: { $regex: new RegExp(busca) } }).toArray()
            if(alunosBuscado.length>0){
             return res.send(alunosBuscado)
            } else{
             return res.status(404)
            }
         }
        const { nome, serie, turma, turno, endereco, numero, bairro, telefone, email, img } = req.body


        const alunoExiste = await alunos.findOne({ email })
        if (!alunoExiste) {
            if (nome && serie && turma && turno && endereco && numero && bairro && telefone && email && img) {
                const alunoInserido = await alunos.insertOne(
                    {
                        nome, serie, turma, turno, endereco, numero, bairro, telefone, email, img
                    }
                )
                if (alunoInserido) {
                    res.status(200).json({mensagem:'Criado com sucesso' + alunoInserido})
                } else {
                    res.status(502).json({mensagem:'Problema ao criar usuário'})
                }
            } else {
                res.status(401)
            }
        }else{
            res.json({mensagem:'Já existe um usuário com este email'})
        }
    }
   

}
