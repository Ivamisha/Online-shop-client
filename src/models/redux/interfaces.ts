import { UserActionEnum, CategoryActionEnum, ProductsActionEnum } from './enums'

export interface IUserInitialStateProps extends Partial<IError> {
  user: IUser | undefined
  isAuth: boolean
  isLoading: boolean
  unauthorizedFavorite: string[]
}

export interface IUser {
  id: string
  name: string
  surname: string
  email: string
  password: string
  address: string
  phoneNumber: string
  userAvatar: string
  favorites: string[]
  shoppingCart: { productId: string; amount: number }[]
}

export interface IUserDate {
  user: IUser | undefined
  errors?: IError
  isAuth: boolean
}

export interface IError {
  error: string
  openSnack: boolean
}

export interface IStartLoading {
  type: UserActionEnum.SET_LOADING
  payload: boolean
}

export interface IUserRegistrate {
  type: UserActionEnum.USER_REGISTRATE
  payload: IUserDate
}

export interface IUserLogin {
  type: UserActionEnum.USER_LOGIN
  payload: IUserDate
}

export interface IUserLogout {
  type: UserActionEnum.USER_LOGOUT
  payload: boolean
}

export interface IUserForgot {
  type: UserActionEnum.USER_FORGOT
  payload: boolean
}

export interface IUserRestore {
  type: UserActionEnum.USER_RESTORE
  payload: boolean
}

export interface IUserEdit {
  type: UserActionEnum.USER_EDIT
  payload: IUserDate
}

export interface IUserCheckAuthorization {
  type: UserActionEnum.USER_AUTHORIZED_CHECK
  payload: IUserDate
}

export interface IUserErrorOpenSnack {
  type: UserActionEnum.USER_ERROR_OPEN_SNACKBAR
  payload: IError
}

export interface IUserAuthorizedErrorAction {
  type: UserActionEnum.USER_AUTHORIZED_ERROR
  payload: IError
}

export interface ICategoryInitialStateProps extends Partial<IError> {
  categories?: ICategoryDate[]
  category?: ICategoryDate
  amount: number
  isLoading: boolean
}

export interface ICategoriesLoading {
  type: CategoryActionEnum.CATEGORIES_LOADING
  payload: boolean
}

export interface ICategoryDate {
  _id: string
  title: string
  description: string
  shown: boolean
  createdAt: string
  updatedAt: string
}

export interface ICategories {
  categories: ICategoryDate[] | []
  amount: number
}

export interface IGetAllCategories {
  type: CategoryActionEnum.GET_ALL_CATEGORIES
  payload: ICategories[]
}

export interface ICategoriesErrors {
  type: CategoryActionEnum.CATEGORIES_ERRORS
  payload: IError
}

export interface IGetPartOfCategories {
  type: CategoryActionEnum.GET_PART_OF_CATEGORIES
  payload: ICategories | undefined
}

export interface ICategoriesCloseSnack {
  type: CategoryActionEnum.CATEGORIES_ERROR_CLOSE_SNACKBAR
  payload: IError
}

export interface IProductsInitialStateProps extends Partial<IError> {
  products?: IProductsDate[]
  product?: IProductsDate
  amount: number
  isLoading: boolean
  shoppingCart?: IProductsDate[]
  favorites: IProductsDate[]
}

export interface IProductsLoading {
  type: ProductsActionEnum.PRODUCTS_LOADING
  payload: boolean
}

export interface IProductsDate {
  id: string
  name: string
  price: number
  quantity: number
  description: string
  picture: string
}

export interface IProducts {
  products: IProductsDate[] | []
  amount: number
}

export interface IGetAllProducts {
  type: ProductsActionEnum.GET_ALL_PRODUCTS
  payload: IProducts[]
}

export interface IGetPartOfProducts {
  type: ProductsActionEnum.GET_PART_OF_PRODUCTS
  payload: IProducts | undefined
}

export interface IFindProduct {
  type: ProductsActionEnum.FIND_PRODUCT
  payload: IProducts | undefined
}

export interface IProductsErrors {
  type: ProductsActionEnum.PRODUCTS_ERRORS
  payload: IError
}

export interface IProductsCloseSnack {
  type: ProductsActionEnum.PRODUCTS_ERROR_CLOSE_SNACKBAR
  payload: IError
}

export interface IProductsGetShoppingCart {
  type: ProductsActionEnum.GET_CART
  payload: IProducts | undefined
}

export interface IChangeCartProductAmount {
  type: UserActionEnum.CHANGE_AMOUNT_OF_CART_PRODUCT
  payload: IUser
}

export interface IAddOrRemoveProductFromShoppingCart {
  type: UserActionEnum.ADD_OR_REMOVE_PRODUCT_FROM_SHOPPING_CART
  payload: IUser
}

export interface IAddOrRemoveProductFromFavorite {
  type: UserActionEnum.ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE
  payload: IUser
}

export interface IClearShoppingCart {
  type: UserActionEnum.CLEAR_SHOPPING_CART
  payload: IUser
}

export interface IGetFavoritesProduts {
  type: ProductsActionEnum.GET_FAVORITES
  payload: IProducts | undefined
}

export interface ISaveFavoritesIdInLocalStorage {
  type: UserActionEnum.SAVE_FAVORITE_IN_LOCAL_STORAGE
  payload: string[]
}

export interface IDeleteFavoriFromLocalStorage {
  type: UserActionEnum.DELETE_PRODUCT_FROM_STORAGE
  payload: string[]
}

export interface IGetFavoriteFromLocalStorage {
  type: UserActionEnum.GET_FAVORITE_FROM_LOCAL_STORAGE
  payload: string[]
}
export interface IClearFavoriteLocalStorage {
  type: UserActionEnum.CLEAR_FAVORITE_LOCAL_STORAGE
  payload: string[]
}

export interface IGetProductsByArrayId {
  type: ProductsActionEnum.GET_PRODUCTS_BY_ARRAY_ID
  payload: IProducts
}

export interface IClearFavorite {
  type: UserActionEnum.CLEAR_FAVORITE
  payload: IUser
}
