import styles from "./constructorItem.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {useEffect, useRef} from "react";
import {useAppDispatch} from "../../../../store";
import {removeIngredient} from "../../../../store/actions/constructor";
import {TConstructorIngredient} from "../../../../store/reducers/constructor";

const ConstructorItem = (props: {item: TConstructorIngredient, index: number}) => {
    const dragRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()

    const [{ isDrag }, drag, previewRef] = useDrag({
        type: 'ingredient',
        item: { index: props.index, uniqueId: props.item.uniqueId },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    })

    drag(dragRef)

    useEffect(() => {
        if (containerRef.current) {
            previewRef(containerRef.current)
        }
    }, [previewRef])

    function deleteItem() {
        dispatch(removeIngredient(props.item.uniqueId))
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
