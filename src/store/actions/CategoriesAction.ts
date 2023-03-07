import { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import { CategoriesServices } from '../../api'
import { CategoryActionEnum, CategoriesActionType } from '../../models/redux'

let timeout: ReturnType<typeof setTimeout> | null = null

const sendErrorToSnack = (dispatch: Dispatch<CategoriesActionType>, error: AxiosError): void => {
  if (timeout) {
    clearTimeout(timeout)
  }

  dispatch({
    type: CategoryActionEnum.CATEGORIES_ERRORS,
    payload: { error: error?.response?.data, openSnack: true },
  })

  timeout = setTimeout(() => {
    dispatch({
      type: CategoryActionEnum.CATEGORIES_ERROR_CLOSE_SNACKBAR,
      payload: { error: '', openSnack: false },
    })
  }, 1000)
}

export const getAllCategories = () => async (dispatch: Dispatch<CategoriesActionType>) => {
  try {
    const response = await CategoriesServices.getPartOfCategories()
    dispatch({
      type: CategoryActionEnum.GET_PART_OF_CATEGORIES,
      payload: { categories: response.categories, amount: response.amount },
    })
  } catch (error) {
    sendErrorToSnack(dispatch, error as AxiosError)
  }
}
