import {Document, Schema, model} from "mongoose";
import { iTodo } from "../utils/interfaces";

interface iTodoData extends iTodo, Document{}
// schema
const todoModel = new Schema<iTodoData>({
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
},
{
    timestamps: true,
}
);

// converting it to model
export default model<iTodoData>("todod", todoModel)