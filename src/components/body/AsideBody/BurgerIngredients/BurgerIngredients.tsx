import React from "react"
import {ingredientsTypes} from "../../../../helpers/lists/burgerLists"
import styles from "./burgerIngredients.module.css"
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components"
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient"
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";

function BurgerIngredients() {
    const [current, setCurrent] = React.useState('bun')
    const {items, loading, error} = useSelector((state: RootState) => state.ingredients)

    const onTabClick = (changeTo: string) => {
        const listElement = document.getElementById(changeTo + '-section')
        if (!listElement) return
        setCurrent(changeTo)
        listElement.scrollIntoView({behavior: "smooth"})
    }

    const onScroll = () => {
        const tabElementTop = document.getElementById('ingredient-tabs')?.offsetTop as number,
            listElementChildren = document.getElementById('ingredient-list')?.childNodes

        let min = window.outerHeight,
            tab = 'bun'

        if (listElementChildren) {
            for (const el of Array.from(listElementChildren)) {
                const element = el.firstChild as HTMLElement
                if (Math.abs(element.getBoundingClientRect().y - tabElementTop) < min) {
                    min = Math.abs(element.getBoundingClientRect().y)
                    tab = element.parentElement?.id?.replace('-section', '') as string
                }
            }
        }
        setCurrent(tab)
    }

    if (loading) return (<div> Ингридиенты загружаются...</div>)
    if (error) return (<div> Произошла ошибка: {error}</div>)
    return (
        <>
            <div className={'mt-5 ' + styles.navbar} id={'ingredient-tabs'}>
                {ingredientsTypes.map((item, index) => (
                    <Tab key={index} value={item.value} active={current === item.value} onClick={onTabClick}>
                        {item.name}
                    </Tab>
                ))}
            </div>
            <div className={styles.ingredients_list} id={'ingredient-list'} onScroll={onScroll}>
                {ingredientsTypes.map((item, index) => (
                    <div key={index} id={item.value + '-section'}>
                        <p className='mt-10 text text_type_main-medium'>{item.name}</p>
                        <div className={'ml-4 ' + styles.ingredients}>
                            {items.ingredients.length > 0 ? items.ingredients
                                    .filter(ingredient => ingredient.type === item.value)
                                    .map(value => (
                                        <BurgerIngredient info={value} key={value._id}/>
                                    ))
                                : (<p className='text text_type_main-default m-2'>Всё съели :(</p>)}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default BurgerIngredients
