import styles from './burgerIngredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import {type TBurgerIngredient} from "../../../../helpers/types/burgerTypes"
import {useState} from "react"
import Modal from '../../../modals/ModalForm'
import IngredientDetails from "../../../modals/IngredientDetails/IngredientDetails"

function BurgerIngredient(props: { info: TBurgerIngredient, count: number }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    return (
        <>
            <div className={'mt-6 ' + styles.block} onClick={openModal}>
                <div className={styles.item}>
                    {props.count ? (<Counter count={props.count} size="default" extraClass="m-1"/>) : ''}
                    <img src={props.info.image} className='ml-4 mr-4' alt={'Фото ' + props.info.name}/>
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

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={'Детали ингредиента'}
            >
                <IngredientDetails info={props.info}/>
            </Modal>
        </>
    )
}

export default BurgerIngredient
