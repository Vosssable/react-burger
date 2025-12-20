import React from 'react'
import { IOrder } from '../../../store/middleware/socketMiddleware'
import { TBurgerIngredient } from '../../../helpers/types/burgerTypes'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './orderInfo.module.css'

interface OrderInfoProps {
    order: IOrder
    ingredients: TBurgerIngredient[]
}

function OrderInfo({ order, ingredients }: OrderInfoProps) {
    const orderIngredients = React.useMemo(() => {
        const uniqueIngredients = new Map<string, { ingredient: TBurgerIngredient; count: number }>()
        order.ingredients.forEach(ingredientId => {
            const ingredient = ingredients.find(ing => ing._id === ingredientId)
            if (ingredient) {
                const existing = uniqueIngredients.get(ingredientId)
                if (existing) {
                    existing.count += 1
                } else {
                    uniqueIngredients.set(ingredientId, { ingredient, count: 1 })
                }
            }
        })
        return Array.from(uniqueIngredients.values())
    }, [order.ingredients, ingredients])

    const orderPrice = React.useMemo(() => {
        return order.ingredients.reduce((total, ingredientId) => {
            const ingredient = ingredients.find(ing => ing._id === ingredientId)
            return total + (ingredient?.price || 0)
        }, 0)
    }, [order.ingredients, ingredients])

    const getStatusText = (status: string) => {
        switch (status) {
            case 'done':
                return { text: 'Выполнен', className: styles.status_done }
            case 'pending':
                return { text: 'Готовится', className: styles.status_pending }
            case 'created':
                return { text: 'Создан', className: styles.status_created }
            case 'cancelled':
                return { text: 'Отменён', className: styles.status_cancelled }
            default:
                return { text: status, className: '' }
        }
    }

    const status = getStatusText(order.status)

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        
        const hoursStr = date.getHours().toString().padStart(2, '0')
        const minutesStr = date.getMinutes().toString().padStart(2, '0')
        const time = `${hoursStr}:${minutesStr}`
        
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const orderDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        const diffDays = Math.floor((today.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24))
        
        if (diffDays === 0) {
            const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
            if (diffMinutes < 1) return 'только что'
            if (diffMinutes < 60) return `${diffMinutes} минут назад`
            return `Сегодня, ${time}`
        }
        
        if (diffDays === 1) {
            return `Вчера, ${time}`
        }
        
        if (diffDays < 7) {
            return `${diffDays} дней назад`
        }
        
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}.${month}.${year}, ${time}`
    }

    return (
        <div className={styles.container}>
            <p className={`text text_type_digits-default ${styles.order_number}`}>#{order.number}</p>
            <h2 className={`text text_type_main-medium ${styles.order_name}`}>{order.name}</h2>
            {order.status && (
                <p className={`text text_type_main-default ${styles.status} ${status.className}`}>
                    {status.text}
                </p>
            )}
            <div className={styles.composition}>
                <h3 className="text text_type_main-medium mb-6">Состав:</h3>
                <div className={styles.ingredients_list}>
                    {orderIngredients.map((item) => (
                        <div key={item.ingredient._id} className={styles.ingredient_item}>
                            <div className={styles.ingredient_image_container}>
                                <div className={styles.ingredient_image}>
                                    <img src={item.ingredient.image} alt={item.ingredient.name} />
                                </div>
                                <span className="text text_type_main-default ml-4">
                                    {item.ingredient.name}
                                </span>
                            </div>
                            <div className={styles.ingredient_price}>
                                <span className="text text_type_digits-default">
                                    {item.count} x {item.ingredient.price}
                                </span>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.footer}>
                <span className="text text_type_main-default text_color_inactive">
                    {formatDate(order.createdAt)}
                </span>
                <div className={styles.price}>
                    <span className="text text_type_digits-default">{orderPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default OrderInfo

