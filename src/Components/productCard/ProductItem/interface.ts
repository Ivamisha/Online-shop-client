import type { IProductsDate } from '../../../models/redux'

export interface IProductItemProps {
  product: IProductsDate
  openSnack: (arg: IProductsDate) => void
}
