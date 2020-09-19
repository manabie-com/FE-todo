import {Todo} from '../models/todo';

export abstract class IAPI {
    abstract signIn(username: string, password: string) : Promise<string>
    abstract getTodos() : Promise<Array<Todo>>
    abstract createTodo(content: string) : Promise<Todo>
    abstract deleteTodo(todoId: string) : Promise<boolean>
    abstract updateTodoStatus(todoId: string, status: boolean) : Promise<boolean>
}