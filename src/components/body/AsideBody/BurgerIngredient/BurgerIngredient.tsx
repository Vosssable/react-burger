import styles from './burgerIngredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import {type TBurgerIngredient} from "../../../../helpers/types/burgerTypes"
import React, {useRef} from "react"
import {useNavigate, useLocation} from "react-router-dom"
import {RootState, store} from "../../../../store"
import {setCurrentIngredient} from "../../../../store/actions/currentIngredient"
import {useDrag} from "react-dnd"
import {useSelector} from "react-redux"

function BurgerIngredient(props: { info: TBurgerIngredient }) {
    const navigate = useNavigate()
    const location = useLocation()
    const dragRef = useRef<HTMLDivElement>(null)

    const count = useSelector((state: RootState) => {
        if (props.info.type === 'bun') {
            const bun = state.burgerConstructor?.bun
            return bun && bun._id === props.info._id ? 2 : 0
        } else {
            const ingredients = state.burgerConstructor?.ingredients || []
            return ingredients.filter(ingredient =>
                ingredient._id === props.info._id
            ).length
        }
    })

    const [{isDrag}, drag] = useDrag({
        type: "burger",
        item: props.info,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    drag(dragRef)

    const openModal = () => {
        store.dispatch(setCurrentIngredient(props.info))
        navigate(`/ingredients/${props.info._id}`, { state: { background: location } })
    }

    return (
        <div className={'mt-6 ' + (isDrag ? styles.block_dragged : styles.block)} onClick={openModal} ref={dragRef}>
            <div className={styles.item}>
                {count > 0 ? (<Counter count={count} size="default" extraClass="m-1"/>) : ''}
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
    )
}

export default BurgerIngredient
