import { IEditFormInputs } from '../Components'
import {
  IForgotFormInputs,
  ILoginFormInputs,
  IRegistrateFormInputs,
  IRestoreFormInputs,
} from '../pages'
import { IProductsDate, IUser } from './redux/interfaces'

export interface IAuthResponse extends IUser { }

export interface ILoginInputMap {
  inputName: keyof ILoginFormInputs
  type: string
  label: string
}

export interface IRegistrateInputMap {
  inputName: keyof IRegistrateFormInputs
  type: string
  label: string
}

export interface IForgotInputMap {
  inputName: keyof IForgotFormInputs
  type: string
  label: string
}

export interface IRestoreInputMap {
  inputName: keyof IRestoreFormInputs
  type: string
  label: string
}

export interface IEditInputMap {
  inputName: keyof IEditFormInputs
  type: string
  label: string
}

export interface IUserDate {
  id: string
  name: string
  surname: string
  email: string
  password: string
  address: string
  phoneNumber: string
}

export interface ICategoryDate {
  id: string
  title: string
  description: string
  shown: boolean
  createdAt: string
  updatedAt: string
}

export interface ICategories {
  categories: ICategoryDate[] | []
  amount: number
}

export interface IProducts {
  products: IProductsDate[] | []
  amount: number
}

