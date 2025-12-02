import { useState, FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { useAppDispatch } from "../../store"
import styles from "./authPages.module.css"
import { register } from "../../store/actions/user"

function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordType, setPasswordType] = useState(
    "password" as "password" | "text"
  )
  const [error, setError] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(false)

    try {
      await dispatch(register({ name, email, password }))
      navigate("/", { replace: true })
    } catch (err: unknown) {
      console.error("Ошибка", err)
      setError(true)
    }
  }

  const onIconClick = () => {
    setPasswordType("text")
    setTimeout(() => setPasswordType("password"), 1500)
  }

  return (
    <main className={styles.page}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            error={error}
            errorText="Ошибка при регистрации"
            size="default"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <div className="mb-6">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            error={error}
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
            disabled={!name || !email || !password}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div className={styles.links_container}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
          <Link to="/login" className={styles.link_to}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  )
}

export default RegisterPage
