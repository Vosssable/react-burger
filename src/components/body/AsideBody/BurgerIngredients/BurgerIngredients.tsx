import React, {useContext} from "react"
import {IngredientContext} from "../../../../app/App"
import {ingredientsTypes} from "../../../../helpers/lists/burgerLists"
import styles from "./burgerIngredients.module.css"
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components"
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient"
import {TBurgerIngredient} from "../../../../helpers/types/burgerTypes"

function BurgerIngredients() {
    const [current, setCurrent] = React.useState('bun')
    const ingredients = useContext(IngredientContext) as TBurgerIngredient[]

    return (
        <>
            <div className={'mt-5 ' + styles.navbar}>
                {ingredientsTypes.map((item, index) => (
                    <Tab key={index} value={item.value} active={current === item.value} onClick={setCurrent}>
                        {item.name}
                    </Tab>
                ))}
            </div>
            <div className={styles.ingredients_list}>
                {ingredientsTypes.map((item, index) => (
                    <div key={index}>
                        <p className='mt-10 text text_type_main-medium'>{item.name}</p>
                        <div className={'ml-4 ' + styles.ingredients}>
                            {ingredients.length > 0 ? ingredients
                                .filter(ingredient => ingredient.type === item.value)
                                .map(value => (
                                    <BurgerIngredient count={Math.floor(Math.random() * 4)} info={value} key={value._id}/>
                                ))
                            : (<>Всё съели :(</>)}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default BurgerIngredients
