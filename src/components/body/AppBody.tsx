import AsideBody from "./AsideBody/AsideBody"
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import BurgerConstructor from "./MainBody/BurgerConstructor/BurgerConstructor";

function AppBody() {


    return (
        <main>
            <DndProvider backend={HTML5Backend}>
                <AsideBody/>
                <BurgerConstructor/>
            </DndProvider>
        </main>
    )
}

export default AppBody
