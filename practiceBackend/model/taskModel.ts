import { Schema, model, Document } from "mongoose";

 interface iTask{
    task: string
    done: string | null
    achieved: string | null
    deadline: string | null
}

export interface iTaskData extends iTask, Document{}

const taskModel = new Schema<iTaskData>({
    task: {
        type: String
    },
    done: {
        type: String,
        default: "start"
    },
    achieved: {
        type: String || null,
        default: null
    },
    deadline: {
        type: String
    },
},{
    timestamps: true,
})

export default model<iTaskData>("todos", taskModel);