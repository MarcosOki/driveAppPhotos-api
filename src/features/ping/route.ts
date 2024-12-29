import { endpoint } from "./endpoint";

export default {
    method:"GET",
    url:"/ping",
    handler:endpoint,
    schema:{
        response:{
            200:{
                type:"object",
                properties:{
                    pong:{type:"string"}
                }
            }
        }
    }
}