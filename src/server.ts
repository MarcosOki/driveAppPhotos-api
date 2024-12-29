import fastify from "fastify"
import dotenv from "dotenv"
import Ping from "./features/ping/route"
const app = fastify()
dotenv.config()

app.route(Ping)

app.listen(
  {
    port: Number(process.env.PORT),
    host: process.env.HOST ? process.env.HOST : "0.0.0.0",
  },
  (err, adress) => {
    console.log(adress);
  }
)
