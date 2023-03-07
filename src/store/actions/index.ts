import * as UserActionTypes from './UserAction'
import * as CategoryActionTypes from './CategoriesAction'
import * as ProductsActionTypes from './ProductsAction'

export default {
  ...UserActionTypes,
  ...CategoryActionTypes,
  ...ProductsActionTypes,
}
