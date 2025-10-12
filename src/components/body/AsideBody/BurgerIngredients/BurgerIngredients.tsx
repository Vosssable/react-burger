import React from "react";
import styles from "../asideBody.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientsTypes} from "../../../../helpers/lists/burgerLists";
import items from "../../../../helpers/mocks";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";


function BurgerIngredients() {
    const [current, setCurrent] = React.useState('bun')
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
                            {items
                                .filter(ingredient => ingredient.type === item.value)
                                .map(value => (
                                    <BurgerIngredient count={0} info={value} key={value._id}/>
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default BurgerIngredients
