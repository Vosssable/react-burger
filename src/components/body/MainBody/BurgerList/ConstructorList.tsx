import styles from "./constructorList.module.css";
import items, {getDefaultBun} from "../../../../helpers/mocks";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function ConstructorList() {
    const pinBun = (type: 'top' | 'bottom') => {
        return (
            <>
                <ConstructorElement
                    type={type}
                    isLocked={true}
                    text={getDefaultBun().name + (type === 'top' ? ' (верх)' : ' (низ)')}
                    price={getDefaultBun().price}
                    thumbnail={getDefaultBun().image}
                    extraClass={styles.element + ' ml-8 ' + (type === 'top' ? 'mb-2' : 'mt-2')}
                />
            </>
        )
    }

    return (
        <div className={'ml-4 mr-4 ' + styles.list}>
                {pinBun('top')}
                <div className={styles.list_scroll_container}>

                </div>
                {pinBun('bottom')}
        </div>
    )
}

export default ConstructorList
