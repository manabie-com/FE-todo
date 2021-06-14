export const SET_TOKEN = 'SET_TOKEN';

export interface ISetTokenAction {
  type: typeof SET_TOKEN,
  token: string
}

export const setToken = (token: string): ISetTokenAction => ({
  type: SET_TOKEN,
  token
})

export type AuthAction = ISetTokenAction;