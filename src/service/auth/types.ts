import { ResponseDataType } from "../types"

export abstract class IAuth {
  abstract signIn(
    username: string,
    password: string,
  ): Promise<ResponseDataType<string>>
  abstract verifyToken(token: string): Promise<ResponseDataType<string>>
}
