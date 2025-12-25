import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { wsConnectionStart, wsConnectionClosed } from '../../store/actions/wsActions'
import { WS_BASE_URL } from '../../helpers/utils/constants'
import OrderCard from '../../components/orders/OrderCard/OrderCard'
import styles from './profileOrders.module.css'

function ProfileOrders() {
    const dispatch = useAppDispatch()
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

    return (
        <main className={styles.container}>
            <div className={styles.orders_list}>
                {orders.map((order) => (
                    <OrderCard
                        key={order._id}
                        order={order}
                        ingredients={ingredients}
                        basePath="/profile/orders"
                    />
                ))}
            </div>
        </main>
    )
}

export default ProfileOrders
