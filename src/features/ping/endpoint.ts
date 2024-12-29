import { FastifyReply, FastifyRequest } from "fastify";

export function endpoint(req:FastifyRequest, res: FastifyReply){
    res.status(200).send("Pong!")
}