import {IAPI} from './types';
import {Todo} from '../models/todo';
import axios from '../utils/axios';
import {AxiosResponse} from 'axios';

class ApiFullstack extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    const resp = await axios.get<AxiosResponse<string>>(`/login?user_id=${username}&password=${password}`);

    localStorage.setItem('token', resp.data.data);

    return resp.data.data;
  }

  async signOut() {
    localStorage.removeItem('token');

    return Promise.resolve();
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');

    return !!token;
  }

  async createTodo(content: string): Promise<Todo> {
    const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
      content,
    });

    return resp.data.data;
  }

  async getTodos(): Promise<Array<Todo>> {
    const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

    return resp.data.data;
  }
}


export default new ApiFullstack();
