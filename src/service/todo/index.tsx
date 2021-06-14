import { Todo, TodoStatus } from "models/todo"
import shortid from "shortid"
import { ITodo } from "./types"
import { ResponseDataType } from "../types"

class TodoService extends ITodo {
  createTodo = async (content: string): Promise<ResponseDataType<Todo>> => {
    return Promise.resolve({
      isSuccess: true,
      data: {
        content: content,
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
      } as Todo,
    })
  }

  async getTodos(): Promise<Todo[]> {
    let todoJSON = localStorage.getItem("todos")
    return todoJSON ? JSON.parse(todoJSON) : []
  }
}

export default new TodoService()
