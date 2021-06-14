import React, { useEffect, useReducer, useState } from "react"

import { useHistory } from "react-router-dom"
import { AuthService } from "service"

import { Button, TextField } from "components"

import styles from "./SignInPage.module.css"
import authReducer, { initialState } from "store/reducers/auth"
import { ROUTE_PATH } from "config/routes"
import { setToken } from "store/actions/auth"

const SignInPage = (): JSX.Element => {
  const [{ token }, dispatch] = useReducer(authReducer, initialState)
  const [form, setForm] = useState<{ userId: string; password: string }>({
    userId: "",
    password: "",
  })
  const [errorMsg, setErrorMsg] = useState<string>("")
  const history = useHistory()

  useEffect(() => {
    redirectIfAuth().then()
  })

  const redirectIfAuth = async () => {
    if (token) {
      let resp = await AuthService.verifyToken(token)
      if (resp.isSuccess) {
        history.push(ROUTE_PATH.TODO)
      }
    }
  }

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const resp = await AuthService.signIn(form.userId, form.password)
    if (resp.isSuccess) {
      dispatch(setToken(resp.data))
      history.replace(ROUTE_PATH.TODO)
    } else {
      setErrorMsg(resp.data)
    }
  }

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("")
    e.persist()
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <img
            alt={"logo"}
            height={70}
            width={280}
            src={
              "https://production-payment.firebaseapp.com/static/media/logo.068aaf49.png"
            }
          />
          <form onSubmit={signIn}>
            <label htmlFor="user_id">
              <TextField
                errorMessage={errorMsg}
                name={"userId"}
                label={"User ID"}
                placeholder={"Please input your User ID"}
                value={form.userId}
                onChange={onChangeField}
              />
            </label>
            <br />
            <label htmlFor="password">
              <TextField
                errorMessage={errorMsg}
                name={"password"}
                label={"Password"}
                type="password"
                placeholder={"Please input your Password"}
                value={form.password}
                onChange={onChangeField}
              />
            </label>
            <br />
            <Button type="submit" style={{ marginTop: 12 }}>
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
