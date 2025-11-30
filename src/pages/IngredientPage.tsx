import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import IngredientDetails from '../components/modals/IngredientDetails/IngredientDetails'
import { RootState } from '../store'

function IngredientPage() {
    const { id } = useParams<{ id: string }>()
    const ingredients = useSelector((state: RootState) => state.ingredients.items.ingredients)
    const ingredient = ingredients.find(item => item._id === id)

    if (!ingredient) {
        return (
            <main>
                <p>Ингредиент не найден</p>
            </main>
        )
    }

    return (
        <main>
            <IngredientDetails info={ingredient} />
        </main>
    )
}

export default IngredientPage
