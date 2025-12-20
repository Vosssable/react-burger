import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IOrder } from '../../../store/middleware/socketMiddleware'
import { TBurgerIngredient } from '../../../helpers/types/burgerTypes'
import styles from './orderCard.module.css'

interface OrderCardProps {
    order: IOrder
    ingredients: TBurgerIngredient[]
    basePath: '/feed' | '/profile/orders'
}

function OrderCard({ order, ingredients, basePath }: OrderCardProps) {
    const navigate = useNavigate()
    const location = useLocation()

    const orderPrice = React.useMemo(() => {
        return order.ingredients.reduce((total, ingredientId) => {
            const ingredient = ingredients.find(ing => ing._id === ingredientId)
            return total + (ingredient?.price || 0)
        }, 0)
    }, [order.ingredients, ingredients])

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

    const handleClick = () => {
        navigate(`${basePath}/${order.number}`, { state: { background: location } })
    }

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
        const diff = now.getTime() - date.getTime()
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        if (minutes < 1) return 'только что'
        if (minutes < 60) return `${minutes} минут назад`
        if (hours < 24) return `${hours} часов назад`
        if (days === 1) return 'вчера'
        if (days < 7) return `${days} дней назад`
        return date.toLocaleDateString('ru-RU')
    }

    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.header}>
                <span className="text text_type_digits-default">#{order.number}</span>
                <span className="text text_type_main-default text_color_inactive">
                    {formatDate(order.createdAt)}
                </span>
            </div>
            <div className={styles.title}>
                <h3 className="text text_type_main-medium">{order.name}</h3>
                {basePath === '/profile/orders' && (
                    <span className={`text text_type_main-default ${status.className}`}>
                        {status.text}
                    </span>
                )}
            </div>
            <div className={styles.content}>
                <div className={styles.ingredients}>
                    {orderIngredients.slice(0, 6).map((item, index) => (
                        <div key={item.ingredient._id + index} className={styles.ingredient_image}>
                            <img src={item.ingredient.image} alt={item.ingredient.name} />
                            {item.count > 1 && (
                                <span className={`text text_type_digits-default ${styles.ingredient_count}`}>
                                    +{item.count}
                                </span>
                            )}
                        </div>
                    ))}
                    {orderIngredients.length > 6 && (
                        <div className={styles.ingredient_image}>
                            <div className={styles.more_count}>
                                <span className="text text_type_digits-default">+{orderIngredients.length - 6}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.price}>
                    <span className="text text_type_digits-default">{orderPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default OrderCard

