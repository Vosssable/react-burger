import styles from './makeOrder.module.css'
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components"

function MakeOrder(props: { offerId: number | string }) {
    return (
        <div className={styles.container + ' m-25 flex-center'}>
            <p className={'text text_type_digits-large mt-30 flex-center ' + styles.shadow}>{props.offerId}</p>
            <p className='text text_type_main-medium mt-8 flex-center'>
                идентификатор заказа
            </p>
            <div className={'mt-15 ' + styles.image_container}>
                <CheckMarkIcon type='primary' className={styles.image}/>
            </div>
            <p className='text text_type_main-default mt-15 flex-center'>
                Ваш заказ начали готовить
            </p>
            <p className='text text_type_main-default text_color_inactive mb-20 mt-2 flex-center'>
                Дождитесь его на орбитальной станции
            </p>
        </div>
    )
}

export default MakeOrder
