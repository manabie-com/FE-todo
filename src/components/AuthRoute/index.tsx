import React, { useEffect, useReducer, useState } from "react"
import authReducer, { initialState } from "store/reducers/auth"
import { Redirect, Route } from "react-router-dom"
import { ROUTE_PATH, RouteTypes } from "config"
import { AuthService } from "../../service"

const AuthRoute = (props: RouteTypes): JSX.Element => {
  const [{ token }] = useReducer(authReducer, initialState)
  const [loading, setLoading] = useState<boolean>(true)
  const [isAuth, setAuth] = useState<boolean>(false)

  useEffect(() => {
    checkAuth().then()
  })

  const checkAuth = async () => {
    let resp = await AuthService.verifyToken(token)
    setAuth(resp.isSuccess)
    setLoading(false)
  }

  return (
    <>
      {!loading ? (
        isAuth ? (
          <Route
            key={props.key}
            path={props.path}
            render={(routeProps) => <props.comp {...routeProps} />}
          />
        ) : (
          <Redirect from={props.path} to={ROUTE_PATH.SIGN_IN} />
        )
      ) : (
        "loading..."
      )}
    </>
  )
}

export default AuthRoute
