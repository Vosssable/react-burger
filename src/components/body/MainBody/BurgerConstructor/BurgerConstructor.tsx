import {useMemo, useRef, useState} from "react"
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import {useNavigate} from "react-router-dom"
import Modal from "../../../modals/Modal/Modal"
import ConstructorList from "../BurgerList/ConstructorList"
import styles from './burgerConstructor.module.css'
import OrderDetails from "../../../modals/OrderDetails/OrderDetails"
import {useDrop} from "react-dnd"
import {TBurgerIngredient} from "../../../../helpers/types/burgerTypes"
import {addBun, addIngredient, cleanConstructor} from "../../../../store/actions/constructor"
import {useAppDispatch, useAppSelector} from "../../../../store"
import {createOrder} from "../../../../store/actions/order"

function BurgerConstructor() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dropRef = useRef<HTMLDivElement>(null)

    const bun = useAppSelector((state) => state.burgerConstructor.bun)
    const ingredients = useAppSelector((state) => state.burgerConstructor.ingredients || [])
    const orderNumber = useAppSelector((state) => state.order.order)
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)
    const accessToken = useAppSelector((state) => state.user.accessToken)


    const {totalPrice, ingredientIds} = useMemo(() => {
        if (bun) {
            const totalPrice = bun.price * 2 + ingredients.reduce((sum, item) => sum + item.price, 0)
            const ingredientIds = [bun._id, ...ingredients.map(item => item._id)]

            return {
                totalPrice,
                ingredientIds
            }
        }
        return {
            totalPrice: 0,
            ingredientIds: []
        }
    }, [bun, ingredients])

    const [, dropTarget] = useDrop({
        accept: "burger",
        drop(item: TBurgerIngredient, monitor) {
            if (item.type === 'bun') {
                dispatch(addBun(item))
            } else {
                dispatch(addIngredient(item))
            }
            return
        }
    })

    dropTarget(dropRef)

    const onMakeOrderClick = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: { pathname: '/' } } })
            return
        }
        dispatch(createOrder(ingredientIds, accessToken))
        setIsModalOpen(true)
    }

    const closeModal = () => {
        dispatch(cleanConstructor())
        setIsModalOpen(false)
    }

    return (
        <section className={'pt-25 ' + styles.main}>
            <div className={styles.main_container}>
                <div ref={dropRef}
                     className={ingredientIds.length !== 0 ? styles.main_container_list : styles.main_container_empty}>
                    <ConstructorList/>
                </div>
                <div className={'mt-10 ' + styles.footer}>
                    <div className={'flex-center pt-1 ' + styles.price}>
                        <p className="text text_type_digits-medium">
                            {totalPrice}
                        </p>
                        <CurrencyIcon type="primary" className='currency-icon-medium'/>
                    </div>
                    <Button htmlType="button" type="primary" size="medium"
                            onClick={onMakeOrderClick}
                            extraClass={"ml-10 " + (ingredientIds.length === 0 ? styles.btn_off : '')}>
                        Оформить заказ
                    </Button>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={null}
            >
                <OrderDetails offerId={orderNumber}/>
            </Modal>
        </section>
    )
}

export default BurgerConstructor
