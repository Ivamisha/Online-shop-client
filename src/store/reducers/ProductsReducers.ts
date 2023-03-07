import {
  ProductsActionType,
  ProductsActionEnum,
  IProductsInitialStateProps,
  IProductsDate,
} from '../../models/redux'

const initialState: IProductsInitialStateProps = {
  products: undefined,
  product: undefined,
  error: '',
  openSnack: false,
  amount: 0,
  isLoading: false,
  shoppingCart: undefined,
  favorites: [],
}

export const ProductsReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: ProductsActionType
): IProductsInitialStateProps => {
  switch (action.type) {
    case ProductsActionEnum.GET_PART_OF_PRODUCTS:
      return {
        ...state,
        products: (action.payload?.products as IProductsDate[]) ?? [],
        amount: action.payload?.amount as number,
      }
    case ProductsActionEnum.PRODUCTS_ERRORS:
      return {
        ...state,
        error: action.payload.error,
        openSnack: action.payload.openSnack,
      }
    case ProductsActionEnum.PRODUCTS_ERROR_CLOSE_SNACKBAR:
      return {
        ...state,
        error: action.payload.error,
        openSnack: action.payload.openSnack,
      }
    case ProductsActionEnum.FIND_PRODUCT:
      return {
        ...state,
        products: (action.payload?.products as IProductsDate[]) ?? [],
        amount: action.payload?.amount as number,
      }
    case ProductsActionEnum.GET_CART:
      return {
        ...state,
        shoppingCart: (action.payload?.products as IProductsDate[]) ?? [],
        amount: action.payload?.amount as number,
      }
    case ProductsActionEnum.GET_FAVORITES:
      return {
        ...state,
        favorites: (action.payload?.products as IProductsDate[]) ?? [],
        amount: action.payload?.amount as number,
      }
    case ProductsActionEnum.GET_PRODUCTS_BY_ARRAY_ID:
      return {
        ...state,
        favorites: (action.payload?.products as IProductsDate[]) ?? [],
        amount: action.payload?.amount as number,
      }
    default:
      return state
  }
}
