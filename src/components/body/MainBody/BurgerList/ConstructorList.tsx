import styles from "./constructorList.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useMemo, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import ConstructorItem from "../ConstructorItem/ConstructorItem";
import {useDrop} from "react-dnd";
import {TBurgerIngredient} from "../../../../helpers/types/burgerTypes";
import {moveIngredient} from "../../../../store/actions/constructor";


function ConstructorList() {
    const ingredients = useSelector((state: RootState) => state.burgerConstructor?.ingredients)
    const bun = useSelector((state: RootState) => state.burgerConstructor?.bun)
    const dispatch = useDispatch()
    const dropRef = useRef<HTMLDivElement>(null)

    const defaultBun = useMemo(() => {
        return bun
    }, [bun])

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item: { index: number, ingredient: TBurgerIngredient }, monitor) {
            if (!monitor.isOver({ shallow: true })) return;
            if (!dropRef.current) return;

            const dragIndex = item.index;
            const hoverIndex = findHoverIndex(monitor);

            if (dragIndex === hoverIndex) return;

            dispatch(moveIngredient(dragIndex, hoverIndex));
        }
    })

    const findHoverIndex = (monitor: any) => {
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset) return -1

        const hoveredElement = document.elementFromPoint(clientOffset.x, clientOffset.y)
        if (!hoveredElement) return -1

        const hoveredIngredient = hoveredElement.closest('[data-ingredient-index]')
        if (!hoveredIngredient) return -1

        const index = hoveredIngredient.getAttribute('data-ingredient-index')
        return index ? parseInt(index) : -1
    }

    const pinBun = (type: 'top' | 'bottom') => {
        return (
            defaultBun ? (
                <ConstructorElement
                    type={type}
                    isLocked={true}
                    text={defaultBun.name + (type === 'top' ? ' (верх)' : ' (низ)')}
                    price={defaultBun.price}
                    thumbnail={defaultBun.image}
                    extraClass={styles.element + ' ml-8 ' + (type === 'top' ? 'mb-2' : 'mt-2')}
                />
            ) : null
        )
    }

    const emptyConstructor = () => {
        return (
            <>
                <p className='text text_type_main-default flex-center'>Перенесите сюда булку и ингредиенты для создания заказа</p>
            </>
        )
    }

    dropTarget(dropRef)

    return (
        <div className={'ml-4 mr-4 ' + styles.list}>
            { !bun && ingredients.length === 0 ? <>{emptyConstructor()}</> :
                <>
                    {pinBun('top')}
                    <div ref={dropRef} className={styles.list_scroll_container}>
                        {ingredients.map((item, index) => (
                            <ConstructorItem item={item} key={index} index={index} />
                        ))}
                    </div>
                    {pinBun('bottom')}
                </>
            }
        </div>
    )
}

export default ConstructorList
