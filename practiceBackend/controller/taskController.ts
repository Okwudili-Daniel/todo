import { Request, Response } from "express";
import {statusCode} from "../utils/statusCode"
import taskModel, {iTaskData} from "../model/taskModel";
import moment from "moment";


export const createTask =async (req: Request, res: Response) =>{
    try {
        const {task, time} = req.body;
        let newTime = time * 1000;
        
        let realTime = new Date().getTime() + newTime;
    
        // console.log(task);
        // console.log(moment(Date.parse(time[1])).format("LLLL"));
    
        // console.log(
        //   moment(
        //     Date.parse(
        //       "Mon Nov 06 2023 00:00:00 GMT+0100 (West Africa Standard Time)"
        //     )
        //   ).format("LLLL")
        // );

        const todo = await taskModel.create({
          task,
          deadline: moment(Date.parse(time[1])).format("LLLL"),
        });
    
        let timing = setTimeout(async () => {
          await taskModel.findByIdAndUpdate(
            todo._id,
            {
              achieved: "Terminated",
            },
            { new: true }
          );
    
          clearTimeout(timing);
          console.log("done");
        }, newTime);
        return res.status(statusCode.CREATED).json({
            message: "Task created",
            data: todo
        })
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Error creating task"
        })
    }
}
export const readTasks =async (req: Request, res: Response) =>{
    try {
        const todos = await taskModel.find().sort({createdAt:-1}).limit(1)

        return res.status(statusCode.CREATED).json({
            message: "Task created",
            data: todos
        })
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Error creating task"
        })
    }
}
export const viewOneTodo = async (req: Request, res: Response) => {
    try {
      const { todoID } = req.params;
  
      const todo = await taskModel.findById(todoID);
  
      return res.status(statusCode.OK).json({
        message: "find",
        data: todo,
      });
    } catch (error) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "Error",
      });
    }
  };
export const viewOneAndUpdateTodo = async (req: Request, res: Response) => {
    try {
     const {done} = req.body;
     const {todoID} = req.params
     
     const check: iTaskData | null = await taskModel.findById({todoID})

     if(!!check?.achieved) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Time has Elapsed"
        })
     }else{
        const todo = await taskModel.findByIdAndUpdate(todoID, {done}, {new: true});
        

        return res.status(statusCode.OK).json({
          message: "find",
          data: todo,
        });
     }
    } catch (error) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "Error",
      });
    }
  };
export const viewDeleteTodo = async (req: Request, res: Response) => {
    try {
     const {todoID} = req.params

     const todo = await taskModel.findByIdAndDelete(todoID)
        return res.status(statusCode.OK).json({
          message: "user deleted",
          data: todo
        });
    } catch (error) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "Error",
      });
    }
  };
  