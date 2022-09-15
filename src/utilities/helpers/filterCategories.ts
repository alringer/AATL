import { ICategory } from 'utilities/types/category'

export const filterCategories = (inputString: string, inputCategories: ICategory[]) => {
    if (inputString === '') {
        return []
    } else if (inputCategories && inputString) {
        const filteredCategories = inputCategories.filter((category: ICategory) =>
            category.longName.toLowerCase().includes(inputString.toLowerCase())
        )
        return [
            `${inputString}`,
            ...filteredCategories.map((category) => {
                return {
                    ...category,
                    tag: 'CATEGORIES',
                }
            }),
        ]
    } else if (!inputCategories && inputString) {
        return [`${inputString}`]
    } else if (inputCategories && !inputString) {
        return [
            ...inputCategories.map((category) => {
                return {
                    ...category,
                    tag: 'CATEGORIES',
                }
            }),
        ]
    } else {
        return []
    }
}
