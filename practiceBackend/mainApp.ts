import { Application, Request, Response } from "express";
import { statusCode } from "./utils/statusCode";
import task from "./router/taskRouter"

const mainApp = (app: Application) =>{
    try {
        app.use("/api/v1",task),
        app.get("/", (req: Request, res: Response) =>{
            try {
                return res.status(statusCode.OK).json({
                    message: "Welcome"
                })
            } catch (error) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: "Error"
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export default mainApp;