import {ReactElement} from "react"
import styles from './headerItem.module.css'


type TProps = {
    text: string;
    icon: ReactElement
}

function HeaderItem(props: TProps) {
    return (
        <div className={styles.block + ' mt-4 mb-4 p-5'}>
            {props.icon}
            <p className='pl-2 text text_type_main-default'>
                {props.text}
            </p>
        </div>
    )
}

export default HeaderItem
