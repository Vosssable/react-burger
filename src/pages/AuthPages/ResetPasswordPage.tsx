import React, { useState, FormEvent, useEffect } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { resetPassword } from "../../helpers/api/passwordReset"
import styles from "./authPages.module.css"

function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const resetPasswordAllowed = location.state?.from === "/forgot-password"
    if (!resetPasswordAllowed) {
      navigate("/forgot-password")
    }
  }, [navigate, location.state?.from])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await resetPassword(password, token)
      if (response.success) {
        sessionStorage.removeItem("resetPasswordAllowed")
        alert("Пароль успешно изменен")
        navigate("/login")
      }
    } catch (error) {
      console.error("Ошибка при сбросе пароля:", error)
      alert("Произошла ошибка при сбросе пароля")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className={styles.page}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <Input
            type="password"
            placeholder="Введите новый пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            size="default"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Введите код из письма"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            name="token"
            size="default"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <div className="mb-20 flex-center">
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            disabled={isLoading || !password || !token}
          >
            Сохранить
          </Button>
        </div>
      </form>
      <div className={styles.links_container}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to="/login" className={styles.link_to}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  )
}

export default ResetPasswordPage
