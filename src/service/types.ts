import { Todo } from '../models/todo';

export abstract class IAPI {
  abstract signIn(username: string, password: string): Promise<string>
  abstract getTodos(): Promise<Array<Todo>>
  abstract createTodo(content: string): Promise<Todo>
  abstract editTodo(id: string, content: string): Promise<Todo>
}