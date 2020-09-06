import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {
    async signIn(username: string, password: string): Promise<string>{
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve(mockToken)
        }

        return Promise.reject('Incorrect username/password')
    }

    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        } as Todo);
    }

    async getTodos(): Promise<Todo[]>{
        let todos = JSON.parse(localStorage.getItem("todos") || '[]');
        return todos;
    }

    async updateTodoStatus(id: string, status: boolean): Promise<boolean> {

        return true;
    }

    async updateAllTodosStatus(status: boolean): Promise<boolean>{
        
        return true;
    }

    async deleteTodo(id: string): Promise<boolean>{

        return true;
    }

    async deleteAllTodos(): Promise<boolean>{
        
        return true;
    }
}

export default new ApiFrontend();