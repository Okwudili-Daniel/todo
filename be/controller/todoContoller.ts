import { Application, Request, Response } from "express";
import {statusCode} from "../utils/statusCode"
import {client, db} from "../utils/dbConfig"
import {Todo} from "../model/todoModel"
import moment from "moment";
import {ObjectId} from "mongodb"

export const createTodo = async(req: Request, res: Response): Promise<Response> =>{
    try {
        await client.connect()
        const {task,timer} = req.body

        let newTimer = timer * 1000

        let time = new Date().getTime() + newTimer

        let createdAt = moment(new Date().getTime()).format("LLL")
        let achievedAt = moment(time).format("LLL")
        let achieved = null

        const tasks: any = new Todo(task, createdAt, achievedAt, achieved )

        let timed = setTimeout(async() =>{
            await db.updateOne({_id: new ObjectId(tasks._id)}, {$set: {achieved: true}})
            clearTimeout(timed)
        }, time)
        
        await db.insertOne(tasks)
        
        return res.status(statusCode.CREATED).json({
            message: "Task created successfully",
            data: tasks
        })
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Task creation failed",
        })
    }
}
export const readAllTodo = async(req: Request, res: Response): Promise<Response> =>{
    try {
        await client.connect()

        const tasks =await db.find().toArray()
        
        return res.status(statusCode.OK).json({
            message: "Task Gotten successfully",
            data: tasks
        })
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Task creation failed",
        })
    }
}
export const readTodo = async(req: Request, res: Response): Promise<Response> =>{
    try {
        await client.connect()
        const {taskId} = req.params

        let tasks = await db.findOne({_id: new ObjectId(taskId)})
        
        
        return res.status(statusCode.OK).json({
            message: "Task Gotten successfully",
            data: tasks
        })
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Task creation failed",
        })
    }
}
export const updateTodo = async(req: Request, res: Response): Promise<Response> =>{
    try {
        await client.connect()
        const {taskId} = req.params

        let findOne:any = await db.findOne({_id: new ObjectId(taskId)})

        if (findOne.achieved) {
            return res.status(statusCode.OK).json({
                message: "Time has elapsed",
            })            
        } else {
            let tasks = await db.updateOne({_id: new ObjectId(taskId)}, {$set: {done: true}})

            return res.status(statusCode.OK).json({
                message: "Task Gotten successfully",
                data: tasks
            })            
        } 
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Task updated failed",
        })
    }
}