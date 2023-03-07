/* eslint-disable max-len */
import { IProductsDate } from '../models/redux'
import { IUser } from '../models/redux'

export const totalCostChecker = (
  products: IProductsDate[] | undefined,
  user: IUser | undefined
) => {
  const totalCost: number[] = []
  user?.shoppingCart.forEach((element) => {
    products?.forEach((product) => {
      if (element.productId === product.id) {
        const result = element.amount * +product.price
        totalCost.push(result)
      }
    })
  })
  return totalCost.reduce((acc, number) => acc + number, 0)
}

export const totalAmountChecker = (user: IUser): number =>
  user?.shoppingCart.map((products) => products.amount).reduce((acc, number) => acc + number, 0) | 0
