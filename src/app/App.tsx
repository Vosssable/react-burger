import React, {useEffect} from 'react'
import './app.module.css'
import AppHeader from "../components/header/AppHeader/AppHeader"
import AppBody from "../components/body/AppBody"
import {Provider} from "react-redux";
import {store} from "../store";
import {cleanIngredients} from "../store/actions/ingredients";
import getIngredientsController from "../helpers/api/getIngredientsController";

function App() {

    useEffect(() => {
        getIngredientsController().then()

        return () => {
            store.dispatch(cleanIngredients())
        }
    }, [])

    return (
        <Provider store={store}>
                <AppHeader/>
                <AppBody/>
        </Provider>
    )
}

export default App
