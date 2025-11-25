import { Outlet, NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../../store/actions/user"
import styles from "./profilePage.module.css"

function ProfilePage() {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await dispatch(logout() as any)
  }

  return (
    <main className={styles.container}>
      <div className={styles.sidebar + " m-4"}>
        <nav className={styles.nav}>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `${styles.navLink} text text_type_main-medium ${
                isActive ? styles.active : "text_color_inactive"
              }`
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              `${styles.navLink} text text_type_main-medium ${
                isActive ? styles.active : "text_color_inactive"
              }`
            }
          >
            История заказов
          </NavLink>
          <NavLink
            to={"/login"}
            onClick={handleLogout}
            className={`${styles.navLink} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </NavLink>
        </nav>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Outlet />
    </main>
  )
}

export default ProfilePage
