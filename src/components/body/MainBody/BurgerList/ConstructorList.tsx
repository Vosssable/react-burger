import styles from "./constructorList.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useContext, useMemo} from "react";
import {IngredientContext} from "../../../../app/App";
import {TBurgerIngredient} from "../../../../helpers/types/burgerTypes";

function ConstructorList() {
    const ingredients = useContext(IngredientContext) as TBurgerIngredient[]

    const defaultBun = useMemo(() => {
        return ingredients.find(item => item._id === '643d69a5c3f7b9001cfa093c')
    }, [ingredients])

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

    return (
        <div className={'ml-4 mr-4 ' + styles.list}>
                {pinBun('top')}
                <div className={styles.list_scroll_container}>
                    {ingredients.map((item, index) => (
                        item.type !== 'bun' ?
                        <div className={styles.list_item}
                             key={'ConstructorElement' + index}
                        >
                            <DragIcon type="primary" className={styles.drag_icon}/>
                            <ConstructorElement
                                isLocked={false}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                extraClass={'ml-2 ' + styles.element}
                            />
                        </div> : null
                    ))}
                </div>
                {pinBun('bottom')}
        </div>
    )
}

export default ConstructorList
