import { IAPI } from "./types";
import { Todo, TodoStatus, Response } from "../models/todo";
import shortid from "shortid";
import { getItemLocalStorage } from "../utils/localStorage.utils";

const mockToken = "testabc.xyz.ahk";

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<Response> {
    if (username === "firstUser" && password === "example") {
      return Promise.resolve({
        token: mockToken,
        status: 200,
        message: "Success",
      });
    }

    return Promise.reject({
      status: 404,
      message: "Incorrect username/password",
    });
  }

  async createTodo(content: string): Promise<Todo> {
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
    } as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    const dataTodos = getItemLocalStorage("dataTodos", JSON.stringify([]));

    if (!dataTodos) {
      return Promise.resolve([]);
    } else {
      return Promise.resolve(dataTodos);
    }
  }
}

export default new ApiFrontend();
