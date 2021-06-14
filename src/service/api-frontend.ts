import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

const mockToken = 'testabc.xyz.ahk';

class ApiFrontend extends IAPI {
  /**
   * FIXME: add isLoggedIn feature to check the permission
   */
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    return !!token;
  }

  async signIn(username: string, password: string): Promise<string> {
    if (username === 'firstUser' && password === 'example') {
      localStorage.setItem('token', mockToken);

      return Promise.resolve(mockToken);
    }

    return Promise.reject('Incorrect username/password');
  }

  /**
   * FIXME: add signOut feature to sign out this app
   */
  async signOut() {
    localStorage.removeItem('token');

    return Promise.resolve();
  }

  async createTodo(content: string): Promise<Todo> {
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    } as Todo);
  }

  /**
   * FIXME: load toDo from the localStorage
   */
  async getTodos(): Promise<Todo[]> {
    const json = localStorage.getItem('todoList');
    let result = [];

    if (json) {
      try {
        result = JSON.parse(json).map((item: any) => item as Todo);
      } catch ({message}) {
        console.error(message);
      }
    }

    return Promise.resolve(result);
  }
}

export default new ApiFrontend();
