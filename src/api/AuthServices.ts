import qs from 'qs'
import type { IAuthResponse } from '../models/interfaces'
import type { IRegistrateFormInputs } from '../pages'
import type { IEditFormInputs } from '../Components'
import api from './api'

export default class AuthService {
  static async registrate({
    name,
    surname,
    email,
    password,
    address,
    phoneNumber,
  }: IRegistrateFormInputs): Promise<IAuthResponse> {
    const response = await api.post<IAuthResponse>('/users/registration', {
      name,
      surname,
      email,
      password,
      address,
      phoneNumber,
    })
    return response.data
  }

  static async login(email: string, password: string): Promise<IAuthResponse> {
    const favorites: string[] = JSON.parse(localStorage.getItem('favorites')!) || []
    const response = await api.post<IAuthResponse>('/users/login', { email, password, favorites })
    return response.data
  }

  static async logout(): Promise<IAuthResponse> {
    const response = await api.get('/users/logout')
    return response.data
  }

  static async checkAuth(): Promise<IAuthResponse> {
    const response = await api.get('/users/refresh')
    return response.data
  }

  static async forgot(email: string): Promise<IAuthResponse> {
    const response = await api.patch('/users/forgot', { email })
    return response.data
  }

  static async restore(activationLink: string, password: string): Promise<IAuthResponse> {
    const response = await api.post(`/users/updatePassword`, { activationLink, password })
    return response.data
  }

  static async editUser(data: FormData): Promise<IAuthResponse> {
    const response = await api.patch<IAuthResponse>(`/users/profile`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }

  static async changeProductAmountInCart(
    amount: number,
    productId: string
  ): Promise<IAuthResponse> {
    const response = await api.patch(`/users/cart/${amount}`, { productId })
    return response.data
  }

  static async addOrRemoveProductFromCart(
    flag: boolean,
    productId: string
  ): Promise<IAuthResponse> {
    const response = await api.patch(`/users/cart`, { productId, flag, amount: 1 })
    return response.data
  }

  static async clearShoppingCart(): Promise<IAuthResponse> {
    const response = await api.patch(`/users/cart/clear`)
    return response.data
  }

  static async addOrRemoveProductFavorite(
    flag: boolean,
    productId: string
  ): Promise<IAuthResponse> {
    const response = await api.patch(`/users/favorites`, { productId, flag })
    return response.data
  }

  static async clearFavorite(): Promise<IAuthResponse> {
    const response = await api.patch(`/users/favorites/clear`)
    return response.data
  }
}
