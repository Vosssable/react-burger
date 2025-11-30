import { NavLink } from 'react-router-dom'
import styles from "./errorPages.module.css"

function NotFoundPage() {
    return (
        <main className={styles.container}>
            <h1 className='text text_type_digits-large'>404</h1>
            <p className="text text_type_main-large">
                Страница не найдена
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Запрашиваемая страница не существует
            </p>
            <NavLink 
                to="/" 
                className="text text_type_main-medium"
            >
                Вернуться на главную
            </NavLink>
        </main>
    )
}

export default NotFoundPage;
