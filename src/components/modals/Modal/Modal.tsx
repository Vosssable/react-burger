import React, {ReactNode, useEffect} from 'react'
import {createPortal} from 'react-dom'
import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const Modal = (props: { isOpen: boolean, onClose: () => void, title: string | null, children: ReactNode, showClose?: boolean }) => {
    const {isOpen, onClose, children, title, showClose = true} = props

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!props.isOpen) return null

    return createPortal(
        <ModalOverlay onClose={onClose}>
            <div className={styles.modal} onClick={event => event.stopPropagation()}>
                <div className={(!title ? styles.absolute : '')+ ' ' + styles.header}>
                    {title ? (
                        <p className='text text_type_main-large'>
                            {title}
                        </p>
                    ) : undefined}
                    {showClose && <CloseIcon data-testid="modal-close" type='primary' className={styles.close} onClick={onClose}/>}
                </div>
                {children}
            </div>
        </ModalOverlay>,
        document.getElementById('modals') as HTMLElement
    )
}

export default Modal
