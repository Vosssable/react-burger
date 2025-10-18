import styles from './ingredientsDetails.module.css'
import {TBurgerIngredient} from "../../../helpers/types/burgerTypes"
import {ingredientsDetails} from "../../../helpers/lists/burgerLists"

type TIngredientDetailsProps = Pick<
    TBurgerIngredient, 'image' | 'carbohydrates' | 'fat' | 'calories' | 'proteins' | 'name' | '_id'
>

function IngredientDetails(props: { info: TIngredientDetailsProps }) {
    return (
        <div className={styles.container + ' flex-center'}>
            <img src={props.info.image} alt={props.info.name} className={styles.image}/>
            <p className='text text_type_main-medium mt-4 flex-center'>{props.info.name}</p>
            <div className={styles.details_row + ' flex-center'}>
                {ingredientsDetails.map((item, index) => (
                    <div key={'details-' + index + props.info._id} className={styles.detail + ' mt-8 mb-5'}>
                        <p className='text text_type_main-default text_color_inactive'>{item.name}</p>
                        <p className='text text_type_digits-default text_color_inactive'>{props.info[item.value]}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default IngredientDetails
