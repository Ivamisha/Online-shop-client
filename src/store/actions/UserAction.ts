import { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import { AuthService } from '../../api'
import { UserActionEnum, UserActionType } from '../../models/redux'
import { IRegistrateFormInputs } from '../../pages'

let timeout: ReturnType<typeof setTimeout> | null = null

const sendErrorToSnack = (dispatch: Dispatch<UserActionType>, error: AxiosError): void => {
  if (timeout) {
    clearTimeout(timeout)
  }

  dispatch({
    type: UserActionEnum.USER_AUTHORIZED_ERROR,
    payload: { error: error?.response?.data?.message, openSnack: true },
  })

  timeout = setTimeout(() => {
    dispatch({
      type: UserActionEnum.USER_ERROR_OPEN_SNACKBAR,
      payload: { error: '', openSnack: false },
    })
  }, 1000)
}

export const registrate =
  (data: IRegistrateFormInputs) => async (dispatch: Dispatch<UserActionType>) => {
    try {
      dispatch({
        type: UserActionEnum.SET_LOADING,
        payload: true,
      })
      const response = await AuthService.registrate(data)
      dispatch({
        type: UserActionEnum.USER_REGISTRATE,
        payload: { user: response, isAuth: true },
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const login =
  (email: string, password: string) => async (dispatch: Dispatch<UserActionType>) => {
    try {
      const response = await AuthService.login(email, password)
      localStorage.removeItem('favorites')
      dispatch({
        type: UserActionEnum.USER_LOGIN,
        payload: {
          user: response,
          isAuth: true,
        },
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const logout = () => async (dispatch: Dispatch<UserActionType>) => {
  try {
    dispatch({
      type: UserActionEnum.SET_LOADING,
      payload: false,
    })
    await AuthService.logout()
    dispatch({
      type: UserActionEnum.USER_LOGOUT,
      payload: false,
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}

export const checkAuth = () => async (dispatch: Dispatch<UserActionType>) => {
  try {
    dispatch({
      type: UserActionEnum.SET_LOADING,
      payload: true,
    })
    const response = await AuthService.checkAuth()
    dispatch({
      type: UserActionEnum.USER_AUTHORIZED_CHECK,
      payload: { user: response, isAuth: true },
    })
  } catch (error) {
    dispatch({
      type: UserActionEnum.USER_AUTHORIZED_CHECK,
      payload: { user: undefined, isAuth: false },
    })
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}

export const forgot = (email: string) => async (dispatch: Dispatch<UserActionType>) => {
  try {
    dispatch({
      type: UserActionEnum.SET_LOADING,
      payload: true,
    })
    await AuthService.forgot(email)
    dispatch({
      type: UserActionEnum.USER_FORGOT,
      payload: false,
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}

export const restore =
  (password: string, activationLink: string) => async (dispatch: Dispatch<UserActionType>) => {
    try {
      dispatch({
        type: UserActionEnum.SET_LOADING,
        payload: true,
      })
      await AuthService.restore(password, activationLink)
      dispatch({
        type: UserActionEnum.USER_RESTORE,
        payload: true,
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const editUser = (data: FormData) => async (dispatch: Dispatch<UserActionType>) => {
  try {
    dispatch({
      type: UserActionEnum.SET_LOADING,
      payload: true,
    })
    const response = await AuthService.editUser(data)
    dispatch({
      type: UserActionEnum.USER_EDIT,
      payload: { user: response, isAuth: true },
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}

export const changeCartProudctAmount =
  (amount: number, productId: string) => async (dispatch: Dispatch<UserActionType>) => {
    try {
      const response = await AuthService.changeProductAmountInCart(amount, productId)
      dispatch({
        type: UserActionEnum.CHANGE_AMOUNT_OF_CART_PRODUCT,
        payload: response,
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const addOrRemoveProductFromCart =
  (productId: string, flag: boolean) => async (dispatch: Dispatch<UserActionType>) => {
    try {
      const response = await AuthService.addOrRemoveProductFromCart(flag, productId)
      dispatch({
        type: UserActionEnum.ADD_OR_REMOVE_PRODUCT_FROM_SHOPPING_CART,
        payload: response,
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const clearShoppingCart = () => async (dispatch: Dispatch<UserActionType>) => {
  try {
    const response = await AuthService.clearShoppingCart()
    dispatch({
      type: UserActionEnum.CLEAR_SHOPPING_CART,
      payload: response,
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}

export const addOrRemoveProductFavorite =
  (productId: string, flag: boolean) => async (dispatch: Dispatch<UserActionType>) => {
    try {
      const response = await AuthService.addOrRemoveProductFavorite(flag, productId)
      dispatch({
        type: UserActionEnum.ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE,
        payload: response,
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const getFavoritesFromLocalStorage = () => async (dispatch: Dispatch<UserActionType>) => {
  try {
    const favorites: string[] = JSON.parse(localStorage.getItem('favorites')!) || []
    dispatch({
      type: UserActionEnum.SAVE_FAVORITE_IN_LOCAL_STORAGE,
      payload: favorites,
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}

export const saveFavoritesInLocalStorage =
  (productId: string) => async (dispatch: Dispatch<UserActionType>) => {
    try {
      const favorites: string[] = JSON.parse(localStorage.getItem('favorites')!) || []
      favorites.push(productId)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      dispatch({
        type: UserActionEnum.SAVE_FAVORITE_IN_LOCAL_STORAGE,
        payload: favorites,
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const deleteProductFromLocalStorage =
  (productId: string) => async (dispatch: Dispatch<UserActionType>) => {
    try {
      const favorites: string[] = JSON.parse(localStorage.getItem('favorites')!) || []
      const favorite = favorites.filter((id) => id !== productId)
      localStorage.setItem('favorites', JSON.stringify(favorite))
      dispatch({
        type: UserActionEnum.DELETE_PRODUCT_FROM_STORAGE,
        payload: favorite,
      })
    } catch (error) {
      sendErrorToSnack(dispatch, error as AxiosError)
    }
  }

export const clearFavoriteLocalStorage = () => async (dispatch: Dispatch<UserActionType>) => {
  try {
    localStorage.removeItem('favorites')
    dispatch({
      type: UserActionEnum.CLEAR_FAVORITE_LOCAL_STORAGE,
      payload: [],
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}

export const clearFavorite = () => async (dispatch: Dispatch<UserActionType>) => {
  try {
    const response = await AuthService.clearFavorite()
    dispatch({
      type: UserActionEnum.CLEAR_FAVORITE,
      payload: response,
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}
