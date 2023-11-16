import axios from "axios"

const URL: string = "http://localhost:1090/api/v1/"

export const createTask = async (data: any) =>{
  try {
    return await axios.post(`${URL}/create-task`, data)
  } catch (error) {
    console.log(error)
  }
}

export const readTasks = async () =>{
  try {
    return await axios.get(`${URL}/read-all-tasks`).then((res: any) =>{
      return res.data.data
    })
  } catch (error) {
    console.log(error)
  }
}

export const readTodo = async (todoID: string) =>{
  try {
    return await axios.get(`${URL}/read-one-task/${todoID}`).then((res: any) =>{
      return res;
    })
  } catch (error) {
    console.log(error)
  }
}

export const viewOneAndUpdateTodo = async (todoID: string) =>{
  try {
    return await axios.patch(`${URL}/update-task/${todoID}`)
  } catch (error) {
    console.log(error)
  }
}