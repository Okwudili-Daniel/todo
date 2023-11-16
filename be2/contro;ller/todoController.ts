import { statusCode } from "../utils/statusCode";
import { Request, Response } from "express";
import todoModel from "../model/todoModel";

export const createTodo = async (req: Request, res: Response) =>{
    try {
        const {task, time} = req.body;

        
        let newTime = time * 1000;
        
        const todo = await todoModel.create({task});
        let timing = setTimeout(async () =>{
            await todoModel.findByIdAndUpdate(todo._id, {deadLine: "Terminated",}, {new: true});

            clearTimeout(timing);
            console.log("done")
        }, newTime)

        return res.status(statusCode.CREATED).json({
            message:"success",
            data: todo
        })

    } catch (error:any) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Error creating",
            date: error.message
        })
    }
}
export const viewTodos = async (req: Request, res: Response) =>{
    try {

        const todo = await todoModel.find();

        return res.status(statusCode.OK).json({
            message:"success",
            data: todo
        })

    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Error creating"
        })
    }
}
export const viewOneTodo = async (req: Request, res: Response) =>{
    try {
        const {todoID} = req.params;

        const todo = await todoModel.findById(todoID);

        return res.status(statusCode.OK).json({
            message:"success",
            data: todo
        })

    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Error creating"
        })
    }
}
export const viewOneAndUpdateTodo = async (req: Request, res: Response) =>{
    try {
        const {done} = req.body;
        const {todoID} = req.params;

        const todo = await todoModel.findByIdAndUpdate(todoID, {done}, {new: true});

        return res.status(statusCode.OK).json({
            message:"success",
            data: todo
        })

    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Error creating"
        })
    }
}
export const viewOneAndDeleteTodo = async (req: Request, res: Response) =>{
    try {
        const {done} = req.body;
        const {todoID} = req.params;

        const todo = await todoModel.findByIdAndDelete(todoID);

        return res.status(statusCode.OK).json({
            message:"success",
            data: todo
        })

    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Error creating"
        })
    }
}