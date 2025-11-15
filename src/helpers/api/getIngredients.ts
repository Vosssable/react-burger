import {customFetch} from "../utils/apiHelper";

async function getIngredients() {
    return customFetch('/ingredients', {
        method: 'GET'
    })
}

export default getIngredients
