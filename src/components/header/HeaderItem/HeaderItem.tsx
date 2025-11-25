import {ReactElement} from "react"
import { Link } from "react-router-dom"
import styles from './headerItem.module.css'


type TProps = {
    text: string
    icon: ReactElement
    to?: string
}

function HeaderItem(props: TProps) {
    const content = (
        <div className={styles.block + ' mt-4 mb-4 p-5'}>
            {props.icon}
            <p className='pl-2 text text_type_main-default'>
                {props.text}
            </p>
        </div>
    )

    if (props.to) {
        return (
            <Link to={props.to} style={{ textDecoration: 'none', color: 'inherit' }}>
                {content}
            </Link>
        )
    }

    return content
}

export default HeaderItem
