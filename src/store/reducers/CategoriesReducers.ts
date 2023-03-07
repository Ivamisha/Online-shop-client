import {
  CategoriesActionType,
  CategoryActionEnum,
  ICategoryInitialStateProps,
  ICategoryDate,
} from '../../models/redux'

const initialState: ICategoryInitialStateProps = {
  categories: undefined,
  category: undefined,
  error: '',
  openSnack: false,
  amount: 0,
  isLoading: false,
}

export const CategoriesReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: CategoriesActionType
): ICategoryInitialStateProps => {
  switch (action.type) {
    case CategoryActionEnum.GET_PART_OF_CATEGORIES:
      return {
        ...state,
        categories: (action.payload?.categories as ICategoryDate[]) ?? [],
        amount: action.payload?.amount as number,
      }
    case CategoryActionEnum.CATEGORIES_ERRORS:
      return {
        ...state,
        error: action.payload.error,
        openSnack: action.payload.openSnack,
      }
    case CategoryActionEnum.CATEGORIES_ERROR_CLOSE_SNACKBAR:
      return {
        ...state,
        error: action.payload.error,
        openSnack: action.payload.openSnack,
      }
    default:
      return state
  }
}
