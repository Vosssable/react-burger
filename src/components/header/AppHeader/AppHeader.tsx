import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"
import HeaderItem from "../HeaderItem/HeaderItem"
import { Link } from "react-router-dom"
import styles from "./appHeader.module.css"

const menuItemsLeft = [
  {
    icon: <BurgerIcon type="primary" />,
    text: "Конструктор",
  },
  {
    icon: <ListIcon type="secondary" />,
    text: "Лента заказов",
  },
]

const menuItemsRight = [
  {
    icon: <ProfileIcon type="secondary" />,
    text: "Личный кабинет",
    to: "/profile",
  },
]

function AppHeader() {
  return (
    <header>
      <nav className={styles.header}>
        <div className={styles.left}>
          {menuItemsLeft.map((item, index) => (
            <HeaderItem key={index} text={item.text} icon={item.icon} />
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
