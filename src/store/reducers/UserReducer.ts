import { UserActionType, UserActionEnum, IUserInitialStateProps } from '../../models/redux'

const initialState: IUserInitialStateProps = {
  user: undefined,
  error: '',
  openSnack: false,
  isLoading: false,
  isAuth: false,
  unauthorizedFavorite: [],
}

export const UserReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: UserActionType
): IUserInitialStateProps => {
  switch (action.type) {
    case UserActionEnum.SET_LOADING:
      return { ...state, isLoading: action.payload }
    case UserActionEnum.USER_REGISTRATE:
      return {
        ...state,
        user: action.payload.user,
        isAuth: action.payload.isAuth,
        isLoading: false,
      }
    case UserActionEnum.USER_LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isAuth: action.payload.isAuth,
        isLoading: false,
      }
    case UserActionEnum.USER_ERROR_OPEN_SNACKBAR:
      return {
        ...state,
        error: action.payload.error,
        openSnack: action.payload.openSnack,
      }
    case UserActionEnum.USER_AUTHORIZED_ERROR:
      return {
        ...state,
        error: action.payload.error,
        openSnack: action.payload.openSnack,
      }
    case UserActionEnum.USER_LOGOUT:
      return { ...state, isAuth: false, isLoading: false }
    case UserActionEnum.USER_AUTHORIZED_CHECK:
      return {
        ...state,
        user: action.payload.user,
        isAuth: action.payload.isAuth,
        isLoading: false,
      }
    case UserActionEnum.USER_FORGOT:
      return {
        ...state,
        isAuth: action.payload,
        isLoading: false,
      }
    case UserActionEnum.USER_RESTORE:
      return {
        ...state,
        isAuth: action.payload,
        isLoading: false,
      }
    case UserActionEnum.USER_EDIT:
      return {
        ...state,
        user: action.payload.user,
        isAuth: action.payload.isAuth,
        isLoading: false,
      }
    case UserActionEnum.CHANGE_AMOUNT_OF_CART_PRODUCT:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      }
    case UserActionEnum.ADD_OR_REMOVE_PRODUCT_FROM_SHOPPING_CART:
      return {
        ...state,
        user: action.payload,
      }
    case UserActionEnum.CLEAR_SHOPPING_CART:
      return {
        ...state,
        user: action.payload,
      }
    case UserActionEnum.ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE:
      return {
        ...state,
        user: action.payload,
      }
    case UserActionEnum.GET_FAVORITE_FROM_LOCAL_STORAGE:
      return {
        ...state,
        unauthorizedFavorite: action.payload,
      }
    case UserActionEnum.SAVE_FAVORITE_IN_LOCAL_STORAGE:
      return {
        ...state,
        unauthorizedFavorite: action.payload,
      }
    case UserActionEnum.DELETE_PRODUCT_FROM_STORAGE:
      return {
        ...state,
        unauthorizedFavorite: action.payload,
      }
    case UserActionEnum.CLEAR_FAVORITE_LOCAL_STORAGE:
      return {
        ...state,
        unauthorizedFavorite: [],
      }
    case UserActionEnum.CLEAR_FAVORITE:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}
