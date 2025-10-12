import AsideBody from "../AsideBody/AsideBody";
import MainBody from "../MainBody/MainBody";
import styles from './appBody.module.css';

function AppBody() {
    return (
        <div className={styles.main}>
            <AsideBody/>
            <MainBody/>
        </div>
    )
}

export default AppBody
