import React from "react";
import styles from "./asideBody.module.css"
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

function AsideBody()  {

    return (
        <section className={styles.aside}>
            <p className='mt-10 text text_type_main-large'>
                Соберите бургер
            </p>
            <BurgerIngredients/>
        </section>
    )
}

export default AsideBody
