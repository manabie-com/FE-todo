import { Todo } from "models/todo"
import { ResponseDataType } from "../types"

export abstract class ITodo {
  abstract getTodos(): Promise<Array<Todo>>
  abstract createTodo(content: string): Promise<ResponseDataType<Todo>>
}
