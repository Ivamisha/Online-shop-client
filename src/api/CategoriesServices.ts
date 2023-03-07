import qs from 'qs'
import api from './api'
import type { ICategories } from '../models/redux'

export default class CategoriesServices {
  static async getPartOfCategories(page?: number, limit?: number): Promise<ICategories> {
    const queries = qs.stringify({ page, limit })
    const response = await api.get<ICategories>(`/categories/?${queries}`)
    return response.data
  }
}
