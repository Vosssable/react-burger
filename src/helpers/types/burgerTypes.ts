export type TBurgerIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    info?: TBurgerIngredient
}

type TIngredientsDetailWords = 'proteins' | 'fat' | 'carbohydrates' | 'calories'


export type TKeyValue = { name: string, value: string }

export type TKeyValueSpec = {name: string, value: TIngredientsDetailWords}
