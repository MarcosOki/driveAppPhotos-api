import { FastifyReply, FastifyRequest } from "fastify";
import util from "util";
import fs from "fs";
import { pipeline } from "stream";
import {v4 as uuidv4} from "uuid"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const pump = util.promisify(pipeline);



export async function endpoint(req: FastifyRequest, res: FastifyReply) {
    try{
        const parts = req.parts()
        let ordem: any
        let fileNamesList:string[] = []
        for await (const part of parts){
            if(part.type == "file"){
                const fileName = `./uploads/${uuidv4()}-${part.filename}`
                await pump(part.file, fs.createWriteStream(fileName))
                fileNamesList.push(fileName)
            } else {
                if(part.fieldname == "ordem"){
                    ordem = part.value
                }
            }
            
        }
        if(!ordem){
            return res.status(500).send({msg:'Campo "ORDEM" obrigatório'})
        }

        //DEBUG 
        console.log(fileNamesList)
        console.log(ordem)

        const result = await prisma.info.create({data:{Url1:fileNamesList[0],Url2:fileNamesList[1],ordem:ordem}})
        return res.status(200).send({msg:"Post criado com sucesso"})
    }catch(err){
        console.log(err)
        return res.status(500).send({msg:"Algo deu errado. tente novamente"})
    }
}
