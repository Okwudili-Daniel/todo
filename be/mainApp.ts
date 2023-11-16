import { Application, Response, Request } from "express";
import{statusCode} from "./utils/statusCode"
import todo from "./router/todoRouter"

const mainApp = (app: Application) =>{
    try {
        app.use("/api/v1", todo)
         app.get("/", (req: Request, res: Response) =>{
            try {
                
                return res.status(statusCode.OK).json({
                    message: "Welcome"
                })
            } catch (error) {
                console.log(error)
            }
        })   
    } catch (error) {
        
    }
    
}

export default mainApp;