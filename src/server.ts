import fastify from "fastify"
import dotenv from "dotenv"
import multipart  from "@fastify/multipart"
import fastifyStatic from "@fastify/static"
import Ping from "./features/ping/route"
import AddNewInfo from "./features/addNewInfo/route"
const app = fastify()
import path from "path"
dotenv.config()

app.register(fastifyStatic, {
  root: path.join(__dirname, "../uploads"),
  prefix: "/uploads/",
})

app.register(multipart)

app.route(Ping)
app.route(AddNewInfo)

app.listen(
  {
    port: Number(process.env.PORT)
  },
  (err, adress) => {
    console.log(adress);
  }
)
