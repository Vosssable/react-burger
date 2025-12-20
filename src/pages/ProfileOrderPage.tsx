import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store'
import { wsConnectionStart, wsConnectionClosed } from '../store/actions/wsActions'
import { WS_BASE_URL } from '../helpers/utils/constants'
import OrderInfo from '../components/orders/OrderInfo/OrderInfo'
import { IOrder } from '../store/middleware/socketMiddleware'

function ProfileOrderPage() {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const orders = useAppSelector((state) => state.wsProfileOrders.orders)
    const ingredients = useAppSelector((state) => state.ingredients.items.ingredients)
    const accessToken = useAppSelector((state) => state.user.accessToken)

    useEffect(() => {
        if (accessToken) {
            dispatch(wsConnectionStart(`${WS_BASE_URL}/orders`, 'profile', accessToken))
        }

        return () => {
            dispatch(wsConnectionClosed())
        }
    }, [dispatch, accessToken])

    const order = orders.find((o: IOrder) => {
        if (!id) return false
        return o._id === id || o.number.toString() === id || o.number === Number(id)
    })

    if (!order) {
        return (
            <main>
                <p className="text text_type_main-default">Заказ не найден</p>
            </main>
        )
    }

    return (
        <main>
            <OrderInfo order={order} ingredients={ingredients} />
        </main>
    )
}

export default ProfileOrderPage

