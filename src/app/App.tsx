import React, {useEffect, useState} from 'react';
import './app.module.css';
import AppHeader from "../components/header/AppHeader/AppHeader";
import AppBody from "../components/body/AppBody";
import getIngredients from "../helpers/api/getIngredients";
import {TBurgerIngredient} from "../helpers/types/burgerTypes";

export const IngredientContext = React.createContext([]);

function App() {
    const [ingredients, setIngredients] = useState<TBurgerIngredient[] | []>([]);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const ingredientsResponse = await getIngredients()
                if (ingredientsResponse && 'data' in ingredientsResponse) {
                    setIngredients(ingredientsResponse.data)
                } else {
                    setIngredients([])
                }
            } catch (error) {
                console.error('Error fetching ingredients:', error)
                setIngredients([])
            }
        };

        fetchIngredients()

        return () => {
            setIngredients([])
        }
    }, [])

    return (
            <IngredientContext.Provider value={ingredients as []}>
                <AppHeader/>
                <AppBody/>
            </IngredientContext.Provider>
    )
}

export default App
