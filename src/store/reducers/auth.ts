import { AuthAction, SET_TOKEN } from "../actions/auth"

export interface AuthState {
  token: string
}

export const initialState: AuthState = {
  token: localStorage.getItem("token") || "",
}

const token = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem("token", action.token)
      state.token = action.token
      return {
        ...state,
      }
    default:
      return state
  }
}

export default token
