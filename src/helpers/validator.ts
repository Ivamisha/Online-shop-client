import * as yup from 'yup'

export const authorizationScheme = yup
  .object({
    email: yup
      .string()
      .email('Введите корректный email')
      .required('Поле Email должно быть заполнено'),
    password: yup.string().required('Поле Пароль должно быть заполнено'),
  })
  .required()

export const registrationScheme = yup
  .object({
    name: yup.string().required('Поле Имя должно быть заполнено'),
    surname: yup.string().required('Поле Фамилия должно быть заполнено'),
    email: yup
      .string()
      .email('Введите корректный email')
      .required('Поле Email должно быть заполнено'),
    password: yup.string().required('Поле Пароль должно быть заполнено'),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Поля "пароль" и "повторите пароль" не совпадают!')
      .required('Поле "Повторите пароль" должно быть заполнено'),
    address: yup.string().required('Поле Адрес должно быть заполнено'),
    phoneNumber: yup.string().required('Поле Телефон должно быть заполнено'),
    checkBoxLicense: yup.boolean().required('Вы должны принять лицензионное соглашение!'),
  })
  .required()

export const forgotScheme = yup
  .object({
    email: yup
      .string()
      .email('Введите корректный email')
      .required('Поле Email должно быть заполнено'),
  })
  .required()

export const restoreScheme = yup
  .object({
    password: yup.string().required('Поле Пароль должно быть заполнено'),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Поля "пароль" и "повторите пароль" не совпадают!')
      .required('Поле "Повторите пароль" должно быть заполнено'),
  })
  .required()

export const editScheme = yup
  .object({
    name: yup.string().required('Поле Имя должно быть заполнено'),
    surname: yup.string().required('Поле Фамилия должно быть заполнено'),
    userAvatar: yup
      .mixed()
      .nullable()
      .required('Загрузите новое изображение!')
      .test('fileSize', 'Загрузите новое изображение!', (value) => {
        const sizeInBytes = 20000000
        return value[0].size <= sizeInBytes
      }),
    email: yup
      .string()
      .email('Введите корректный email')
      .required('Поле Email должно быть заполнено'),
    address: yup.string().required('Поле Адрес должно быть заполнено'),
    phoneNumber: yup.string().required('Поле Телефон должно быть заполнено'),
  })
  .required()
