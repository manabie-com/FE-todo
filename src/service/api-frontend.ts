import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import {get as storageGet, todoDataName} from '../utils/storage';
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
            user_id: 'firstUser',
            editable: false,
        } as Todo);
    }

    async getTodos(): Promise<Todo[]>{
        const todos: Todo[] = storageGet(todoDataName) || [];
        return Promise.resolve(todos.map(t => {
            t.editable = false;
            return t;
        }));
    }
}

export default new ApiFrontend();
