import { IAuth } from "./types"
import { ResponseDataType } from "../types"

const mockToken = "testabc.xyz.ahk"

class AuthService extends IAuth {
  signIn = async (
    username: string,
    password: string,
  ): Promise<ResponseDataType<string>> => {
    if (username === "firstUser" && password === "example") {
      return Promise.resolve({ isSuccess: true, data: mockToken })
    }
    return Promise.resolve({
      isSuccess: false,
      data: "Incorrect username/password",
    })
  }

  verifyToken = async (token: string): Promise<ResponseDataType<string>> => {
    if (token === mockToken) {
      return Promise.resolve({ isSuccess: true, data: "Verified token" })
    } else {
      return Promise.resolve({
        isSuccess: false,
        data: "Incorrect token",
      })
    }
  }
}

export default new AuthService()
