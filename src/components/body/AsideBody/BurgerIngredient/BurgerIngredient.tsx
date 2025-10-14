import styles from './burgerIngredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {type TBurgerIngredient} from "../../../../helpers/types/burgerTypes";

function BurgerIngredient(props: {info: TBurgerIngredient, count: number}) {
    return (
        <div className={'mt-6 ' + styles.block}>
            <div className={styles.item}>
                {props.count ? (<Counter count={props.count} size="default" extraClass="m-1" />) : ''}
                <img src={props.info.image} className='ml-4 mr-4' alt={'Фото '+ props.info.name}/>
                <div className={'flex-center mt-1 ' + styles.price}>
                    <p className="text text_type_digits-default">
                        {props.info.price}
                    </p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className="mt-1 flex-center text text_type_main-default">
                    {props.info.name}
                </p>
            </div>
        </div>
    )
}

export default BurgerIngredient
