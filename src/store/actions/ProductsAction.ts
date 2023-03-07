import { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import { ProductsServices } from '../../api'
import { ProductsActionEnum, ProductsActionType } from '../../models/redux'

let timeout: ReturnType<typeof setTimeout> | null = null

const sendErrorToSnack = (dispatch: Dispatch<ProductsActionType>, error: AxiosError): void => {
  if (timeout) {
    clearTimeout(timeout)
  }

  dispatch({
    type: ProductsActionEnum.PRODUCTS_ERRORS,
    payload: { error: error?.response?.data, openSnack: true },
  })

  timeout = setTimeout(() => {
    dispatch({
      type: ProductsActionEnum.PRODUCTS_ERROR_CLOSE_SNACKBAR,
      payload: { error: '', openSnack: false },
    })
  }, 1000)
}

export const getPartOfProducts =
  (page: number) => async (dispatch: Dispatch<ProductsActionType>) => {
    try {
      const response = await ProductsServices.getPartOfProducts(page)
      dispatch({
        type: ProductsActionEnum.GET_PART_OF_PRODUCTS,
        payload: { products: response.products, amount: response.amount },
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const findProduct = (product: string) => async (dispatch: Dispatch<ProductsActionType>) => {
  try {
    const response = await ProductsServices.findProduct(product)
    dispatch({
      type: ProductsActionEnum.FIND_PRODUCT,
      payload: { products: response.products, amount: response.amount },
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}

export const getProductCart = () => async (dispatch: Dispatch<ProductsActionType>) => {
  try {
    const response = await ProductsServices.getShoppingCart()
    dispatch({
      type: ProductsActionEnum.GET_CART,
      payload: { products: response.products, amount: response.amount },
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}

export const getFavoriteProducts = () => async (dispatch: Dispatch<ProductsActionType>) => {
  try {
    const response = await ProductsServices.getFavoriteProducts()
    dispatch({
      type: ProductsActionEnum.GET_FAVORITES,
      payload: { products: response.products, amount: response.amount },
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}

export const getProductByArrayId =
  (field: 'favorites' | 'cart') => async (dispatch: Dispatch<ProductsActionType>) => {
    const productsId: string[] = JSON.parse(localStorage.getItem(`${field}`)!) || []
    try {
      const response = await ProductsServices.getProductsByArrayID(productsId)
      dispatch({
        type: ProductsActionEnum.GET_PRODUCTS_BY_ARRAY_ID,
        payload: { products: response.products, amount: response.amount },
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }
