import React, {ReactNode} from 'react'
import styles from './modalOverlay.module.css'

const ModalOverlay = (props: { children: ReactNode, onClose: () => void }) => {
    return (
        <div className={styles.overlay} onClick={props.onClose}>
            {props.children}
        </div>
    )
}

export default ModalOverlay
