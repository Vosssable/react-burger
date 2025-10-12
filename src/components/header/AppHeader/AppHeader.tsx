import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderItem from "../HeaderItem/HeaderItem";
import React from "react";
import styles from './appHeader.module.css';

const menuItemsLeft = [
    {
        icon: <BurgerIcon type="primary"/>,
        text: 'Конструктор'
    },
    {
        icon: <ListIcon type="secondary"/>,
        text: 'Лента заказов'
    }
]

const menuItemsRight = [
    {
        icon: <ProfileIcon type="secondary"/>,
        text: 'Личный кабинет'
    }
]

function AppHeader() {
    return (
        <nav className={styles.header}>
            <div className={styles.left}>
                {menuItemsLeft.map((item, index) => (
                    <HeaderItem key={index} text={item.text} icon={item.icon}/>
                ))}
            </div>
            <Logo className={styles.logo}/>
            <div className={styles.right}>
                {menuItemsRight.map((item, index) => (
                    <HeaderItem key={index} text={item.text} icon={item.icon}/>
                ))}
            </div>
        </nav>
    )
}

export default AppHeader
