// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoDB } from '../../../lib/MongoDB'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    
    if (req.method === 'GET') {
        res.status(200).json({ mensagem: 'Olá' })
    }

    if (req.method === 'POST') {
        const { db } = await MongoDB();
        const alunos = db.collection('livros');
        const { titulo, autor, descricao,src,registro,genero,editora } = req.body
        const livroExiste = await alunos.findOne({ registro })
        if (!livroExiste) {
            if (titulo&&autor&&descricao&&src&&registro&&genero&&editora) {
                const livroInserido = await alunos.insertOne(
                    {
                        titulo, autor, descricao,src,registro,genero,editora
                    }
                )
                if (livroInserido) {
                    res.status(200).json({mensagem:'Criado com sucesso' + livroInserido})
                } else {
                    res.status(502).json({mensagem:'Problema ao salvar usuário'})
                }
            } else {
                res.status(401)
            }
        }else{
            res.json({mensagem:'Já existe um livro com este registro'})
        }
    }
   

}
