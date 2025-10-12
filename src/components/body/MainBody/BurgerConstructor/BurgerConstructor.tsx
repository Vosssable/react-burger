import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import items from "../../../../helpers/mocks";
import styles from './burgerConstructor.module.css'

function BurgerConstructor() {
    function checkItem(index: number, len: number) {
        if (index === 0) {
            return 'top'
        } else if (index === len - 1) {
            return 'bottom'
        } else return undefined
    }


    return (
        <section className='pt-25'>
            <div className={'ml-4 mr-4 ' + styles.burger_list}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    {items.map((item, index) => (
                        <div className={styles.list_item}
                             key={'ConstructorElement' + index}
                        >
                            {!checkItem(index, items.length) ? (
                                <DragIcon type="primary" className={styles.drag_icon}/>) : undefined}
                            <ConstructorElement
                                type={checkItem(index, items.length)}
                                isLocked={true}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                extraClass={checkItem(index, items.length) ? 'ml-8' : 'ml-2'}
                            />
                        </div>))}

                </div>
            </div>
            <div className={'mt-10 ' + styles.footer}>
                <div className={'flex-center pt-1 ' + styles.price}>
                    <p className="text text_type_digits-medium">
                        {610}
                    </p>
                    <CurrencyIcon type="primary" className='currency-icon-medium'/>
                </div>
                <Button htmlType="button" type="primary" size="medium" extraClass="ml-10">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor
