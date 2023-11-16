import {ObjectId} from "mongodb"

export class Todo {
    public _id: ObjectId
    public task: string
    public done: boolean
    public createdAt: string
    public achievedAt: string
    public achieved: boolean | null

    constructor(task: string, createdAt: string, achievedAt: string, achieved: boolean | null) {
        this._id = new ObjectId()
        this.task = task
        this.done = false
        this.createdAt = createdAt
        this. achievedAt = achievedAt
        this. achieved = achieved
        
    }
}