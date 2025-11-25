import React, { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { requestPasswordReset } from '../../helpers/api/passwordReset'
import styles from "./authPages.module.css"

function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        
        try {
            const response = await requestPasswordReset(email)
            if (response.success) {
                navigate('/reset-password', { state: { from: '/forgot-password' } })
            }
        } catch (error) {
            console.error('Ошибка при восстановлении пароля:', error)
            alert('Произошла ошибка при восстановлении пароля')
        }
    }

    return (
        <main className={styles.page}>
            <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '480px' }}>
                <div className="mb-6">
                    <Input
                        type="email"
                        placeholder="Укажите e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={false}
                        size="default" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
                </div>
                <div className="mb-20 flex-center">
                    <Button 
                        type="primary" 
                        size="medium" 
                        htmlType="submit"
                        disabled={!email}
                    >
                        Восстановить
                    </Button>
                </div>
            </form>
            <div className={styles.links_container}>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?{' '}
                    <Link to="/login" className={styles.link_to}>
                        Войти
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default ForgotPasswordPage
