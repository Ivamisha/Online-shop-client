import qs from 'qs'
import api from './api'
import type { IProducts } from '../models/redux'

export default class ProductsServices {
  static async getPartOfProducts(page?: number): Promise<IProducts> {
    const queries = qs.stringify({ page })
    const response = await api.get<IProducts>(`/products/?${queries}`)
    return response.data
  }

  static async findProduct(name?: string): Promise<IProducts> {
    const response = await api.get<IProducts>(`/products/${name}`)
    return response.data
  }

  static async getShoppingCart(): Promise<IProducts> {
    const response = await api.get<IProducts>(`/products/cart`)
    return response.data
  }

  static async getFavoriteProducts(): Promise<IProducts> {
    const response = await api.get<IProducts>(`/products/favorite`)
    return response.data
  }

  static async getProductsByArrayID(favoriteArray: string[]): Promise<IProducts> {
    const response = await api.post<IProducts>(`/products/unauthorized`, {
      favoriteArray: favoriteArray,
    })
    return response.data
  }
}
