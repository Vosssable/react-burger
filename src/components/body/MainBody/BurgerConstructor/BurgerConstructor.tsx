import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burgerConstructor.module.css'
import ConstructorList from "../BurgerList/ConstructorList";

function BurgerConstructor() {

    return (
        <section className={'pt-25 ' + styles.main}>
            <ConstructorList/>
            <div className={'mt-10 ' + styles.footer}>
                <div className={'flex-center pt-1 ' + styles.price}>
                    <p className="text text_type_digits-medium">
                        {610}
                    </p>
                    <CurrencyIcon type="primary" className='currency-icon-medium'/>
                </div>
                <Button htmlType="button" type="primary" size="medium" extraClass="ml-10">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor
