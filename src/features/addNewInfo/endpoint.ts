import { FastifyReply, FastifyRequest } from "fastify";
import util from "util";
import fs from "fs";
import { pipeline } from "stream";
import {v4 as uuidv4} from "uuid"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const pump = util.promisify(pipeline);

interface body {
    ordem:string
}

export async function endpoint(req: FastifyRequest<{Body:body}>, res: FastifyReply) {
    try{
        const files = await req.files()
        const ordem:any = req.body.ordem
        console.log(ordem.value)
        let fileNamesList = []
        for await (const file of files){
            const fileName = `./uploads/${uuidv4()}-${file.filename}`
            await pump(file.file, fs.createWriteStream(fileName))
            fileNamesList.push(fileName)
        }
        // const result = await prisma.info.create({data:{Url1:fileNamesList[0],Url2:fileNamesList[1],ordem:ordem}})
        // console.log(result)
    }catch(err){
        console.log(err)
        res.send("erro")
    }
}
