import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"
import HeaderItem from "../HeaderItem/HeaderItem"
import { Link, useLocation } from "react-router-dom"
import styles from "./appHeader.module.css"

function AppHeader() {
  const location = useLocation()
  const isConstructorActive = location.pathname === "/"
  const isFeedActive = location.pathname === "/feed"
  const isProfileActive = location.pathname.startsWith("/profile")

  const menuItemsLeft = [
    {
      icon: <BurgerIcon type={isConstructorActive ? "primary" : "secondary"} />,
      text: "Конструктор",
      to: "/",
    },
    {
      icon: <ListIcon type={isFeedActive ? "primary" : "secondary"} />,
      text: "Лента заказов",
      to: "/feed",
    },
  ]

  const menuItemsRight = [
    {
      icon: <ProfileIcon type={isProfileActive ? "primary" : "secondary"} />,
      text: "Личный кабинет",
      to: "/profile",
    },
  ]

  return (
    <header>
      <nav className={styles.header}>
        <div className={styles.left}>
          {menuItemsLeft.map((item, index) => (
            <HeaderItem key={index} text={item.text} icon={item.icon} to={item.to} />
          ))}
        </div>
        <Link to="/">
          <Logo className={styles.logo} />
        </Link>
        <div className={styles.right}>
          {menuItemsRight.map((item, index) => (
            <HeaderItem
              key={index}
              text={item.text}
              icon={item.icon}
              to={item.to}
            />
          ))}
        </div>
      </nav>
    </header>
  )
}

export default AppHeader
