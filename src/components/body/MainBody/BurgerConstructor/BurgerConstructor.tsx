import {useMemo, useRef, useState} from "react"
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import Modal from "../../../modals/Modal/Modal"
import ConstructorList from "../BurgerList/ConstructorList"
import styles from './burgerConstructor.module.css'
import OrderDetails from "../../../modals/OrderDetails/OrderDetails"
import {useDrop} from "react-dnd";
import {TBurgerIngredient} from "../../../../helpers/types/burgerTypes";
import {addBun, addIngredient} from "../../../../store/actions/constructor";
import {useDispatch, useSelector} from "react-redux";
import {RootState, store} from "../../../../store";
import postOrders from "../../../../helpers/api/postOrders";
import {cleanOrder, setOrder} from "../../../../store/actions/order";

function BurgerConstructor() {
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dropRef = useRef<HTMLDivElement>(null)

    const bun = useSelector((state: RootState) => state.burgerConstructor.bun)
    const ingredients = useSelector((state: RootState) => state.burgerConstructor.ingredients || [])


    const { totalPrice, ingredientIds } = useMemo(() => {
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
        postOrders(ingredientIds).then(response => {
            if (response.success) {
                dispatch(setOrder({order: response.order.number, name: response.name}))
                openModal()
            }
        }).catch(error => {
            if (error instanceof Error && 'status' in error) {
                if (error.status === 404) {
                    window.alert('Ошибка 404')
                    console.error(error)
                } else if (error.status === 500) {
                    window.alert('Ошибка 500')
                    console.error(error)
                } else {
                    window.alert('Непредвиденная ошибка')
                    console.error(error)
                }
                dispatch(cleanOrder())
                return
            }
        })
    }

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    return (
        <section className={'pt-25 ' + styles.main}>
            <div ref={dropRef}>
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
                        onClick={onMakeOrderClick} extraClass="ml-10">
                    Оформить заказ
                </Button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={null}
            >
                <OrderDetails offerId={store.getState().order?.order}/>
            </Modal>
        </section>
    )
}

export default BurgerConstructor
