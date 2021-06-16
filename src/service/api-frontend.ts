import { Todo, TodoStatus } from '../models/todo';

import { IAPI } from './types';
import { getStorage } from '../utils/storage';
import shortid from 'shortid';

const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    if (username === 'firstUser' && password === 'example') {
      return Promise.resolve(mockToken)
    }

    return Promise.reject('Incorrect username/password')
  }

  async createTodo(content: string): Promise<Todo> {
    return Promise.resolve({
      content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser'
    } as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    const state = getStorage('state');
    const { todos } = state;
    return Promise.resolve(todos as Todo[]);
  }

  async editTodo(id: string, content: string): Promise<Todo> {
    return Promise.resolve({
      content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id,
      user_id: 'firstUser'
    } as Todo);
  }
}

export default new ApiFrontend();