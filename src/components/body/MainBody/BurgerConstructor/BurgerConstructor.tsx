import {useState} from "react"
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import Modal from "../../../modals/Modal/Modal"
import ConstructorList from "../BurgerList/ConstructorList"
import styles from './burgerConstructor.module.css'
import OrderDetails from "../../../modals/OrderDetails/OrderDetails"

function BurgerConstructor() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

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
                <Button htmlType="button" type="primary" size="medium"
                        onClick={openModal} extraClass="ml-10">
                    Оформить заказ
                </Button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={null}
            >
                <OrderDetails offerId={'034536'}/>
            </Modal>
        </section>
    )
}

export default BurgerConstructor
