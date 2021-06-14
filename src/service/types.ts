import {Todo} from '../models/todo';

export abstract class IAPI {
  abstract signIn(username: string, password: string): Promise<string>

  abstract signOut(): Promise<void>

  abstract isLoggedIn(): boolean

  abstract getTodos(): Promise<Array<Todo>>

  abstract createTodo(content: string): Promise<Todo>
}
