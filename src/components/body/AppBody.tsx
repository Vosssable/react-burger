import AsideBody from "./AsideBody/AsideBody"
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import BurgerConstructor from "./MainBody/BurgerConstructor/BurgerConstructor";
import styles from "./appBody.module.css";

function AppBody() {

    return (
        <main>
            <DndProvider backend={HTML5Backend}>
                <div className={styles.container}>
                <AsideBody/>
                <BurgerConstructor/>
                </div>
            </DndProvider>
        </main>
    )
}

export default AppBody
