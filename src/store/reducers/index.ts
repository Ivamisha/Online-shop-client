import { combineReducers } from 'redux'
import { UserReducer } from './UserReducer'
import { CategoriesReducer } from './CategoriesReducers'
import { ProductsReducer } from './ProductsReducers'

export const rootReducer = combineReducers({
  user: UserReducer,
  categories: CategoriesReducer,
  products: ProductsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
