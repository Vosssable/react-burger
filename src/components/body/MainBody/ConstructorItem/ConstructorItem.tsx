import styles from "./constructorItem.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TBurgerIngredient} from "../../../../helpers/types/burgerTypes";
import {useDrag} from "react-dnd";
import {useRef} from "react";
import {useDispatch} from "react-redux";
import {removeIngredient} from "../../../../store/actions/constructor";

const ConstructorItem = (props: {item: TBurgerIngredient, index: number}) => {
    const dragRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()

    const [{ isDrag }, drag, previewRef] = useDrag({
        type: 'ingredient',
        item: { index: props.index, ingredient: props.item._id },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    })

    drag(dragRef)

    if (containerRef.current) {
        previewRef(containerRef.current)
    }

    function deleteItem() {
        dispatch(removeIngredient(props.item._id, props.index))
    }

    return (
        <div ref={containerRef} className={isDrag ? styles.list_item_draggable : styles.list_item} data-ingredient-index={props.index}>
            <div ref={dragRef}>
                <DragIcon type="primary" className={styles.drag_icon}/>
            </div>
            <ConstructorElement
                isLocked={false}
                text={props.item.name}
                price={props.item.price}
                thumbnail={props.item.image}
                handleClose={deleteItem}
                extraClass={'ml-2 ' + styles.element}
            />
        </div>
    )
}

export default ConstructorItem
