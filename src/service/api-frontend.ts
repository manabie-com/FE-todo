import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

const mockToken: string = 'testabc.xyz.ahk';

class ApiFrontend extends IAPI {
    async signIn(username: string, password: string): Promise<string>{
        // if (username === 'firstUser' && password === 'example') {
        if (username === 'username' && password === 'password') {
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
            user_id: 'username'
        } as Todo);
    }

    async getTodos(): Promise<Todo[]>{
        return []
    }
}

export default new ApiFrontend();