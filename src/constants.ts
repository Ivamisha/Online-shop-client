import {
  ILoginInputMap,
  IRegistrateInputMap,
  IRestoreInputMap,
  IForgotInputMap,
  IEditInputMap,
} from './models/interfaces'

export const inputsForLoginRegistrate: IRegistrateInputMap[] = [
  {
    label: 'Имя',
    inputName: 'name',
    type: 'text',
  },
  {
    label: 'Фамилия',
    inputName: 'surname',
    type: 'text',
  },
  {
    label: 'Пароль',
    inputName: 'password',
    type: 'password',
  },
  {
    label: 'Повторите Пароль',
    inputName: 'repeatPassword',
    type: 'password',
  },
  {
    label: 'Адрес',
    inputName: 'address',
    type: 'text',
  },
  {
    label: 'Телефон',
    inputName: 'phoneNumber',
    type: 'text',
  },
  {
    label: 'Email',
    inputName: 'email',
    type: 'text',
  },
]

export const inputsForLogin: ILoginInputMap[] = [
  {
    inputName: 'email',
    type: 'text',
    label: 'email',
  },
  {
    inputName: 'password',
    type: 'password',
    label: 'Пароль',
  },
]

export const inputsForForgot: IForgotInputMap[] = [
  {
    inputName: 'email',
    type: 'text',
    label: 'email',
  },
]

export const inputsForRestore: IRestoreInputMap[] = [
  {
    inputName: 'password',
    type: 'text',
    label: 'Пароль',
  },

  {
    inputName: 'repeatPassword',
    type: 'text',
    label: 'Повторите пароль',
  },
]

export const inputsForEdit: IEditInputMap[] = [
  {
    label: 'Имя',
    inputName: 'name',
    type: 'text',
  },
  {
    label: 'Фамилия',
    inputName: 'surname',
    type: 'text',
  },
  {
    label: 'Email',
    inputName: 'email',
    type: 'text',
  },
  {
    label: 'Адрес',
    inputName: 'address',
    type: 'text',
  },
  {
    label: 'Телефон',
    inputName: 'phoneNumber',
    type: 'text',
  },
]

export const drawerWidth = '240px'
