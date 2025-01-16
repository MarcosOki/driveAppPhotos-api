import { endpoint } from "./endpoint"

export default {
    method:"POST",
    url:"/info",
    handler:endpoint,
    schema:{
        response:{
            200:{
                type:"object",
                properties:{
                    msg:{type:"string"}
                }
            },
            500:{
                type:"object",
                properties:{
                    msg:{type: "string"}
                }
            }
        }
    }
}