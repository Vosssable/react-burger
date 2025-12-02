import React, { useState, FormEvent } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { useAppDispatch } from "../../store"
import { login } from "../../store/actions/user"
import styles from "./authPages.module.css"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordType, setPasswordType] = useState(
    "password" as "password" | "text"
  )
  const [error, setError] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  interface LocationState {
    from?: {
      pathname: string
    }
  }

  const from = (location.state as LocationState)?.from?.pathname || "/"

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(false)

    try {
      await dispatch(login({ email, password }))
      navigate(from, { replace: true })
    } catch (err: unknown) {
      console.log(err)
      setError(true)
    }
  }

  const onIconClick = () => {
    setPasswordType("text")
    setTimeout(() => setPasswordType("password"), 1500)
  }

  return (
    <main className={styles.page}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className="mb-6">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            error={error}
            errorText="Неправильно введен email или пароль"
            size="default"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <div className="mb-6">
          <Input
            type={passwordType}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            error={error}
            size="default"
            onIconClick={onIconClick}
            icon={"ShowIcon"}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <div className="mb-20 flex-center">
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            disabled={!email || !password}
          >
            Войти
          </Button>
        </div>
      </form>
      <div className={styles.links_container}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?{" "}
          <Link
            to="/register"
            className={styles.link_to}
          >
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive mt-4">
          Забыли пароль?{" "}
          <Link
            to="/forgot-password"
            className={styles.link_to}
          >
            Восстановить пароль
          </Link>
        </p>
      </div>
    </main>
  )
}

export default LoginPage
