import {TKeyValue, TKeyValueSpec} from "../types/burgerTypes";

const ingredientsTypes: TKeyValue[] = [
    {
        name: 'Булки',
        value: 'bun',
    },
    {
        name: 'Соусы',
        value: 'sauce',
    },
    {
        name: 'Начинки',
        value: 'main',
    }
]

const ingredientsDetails: TKeyValueSpec[] = [
    {name: 'Калории,ккал', value: 'calories'},
    {name: 'Белки, г', value: 'proteins'},
    {name: 'Жиры, г', value: 'fat'},
    {name: 'Углеводы, г', value: 'carbohydrates'}
]

export {ingredientsTypes, ingredientsDetails}
