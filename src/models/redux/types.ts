import {
  IStartLoading,
  IUserRegistrate,
  IUserLogin,
  IUserLogout,
  IUserForgot,
  IUserRestore,
  IUserEdit,
  IUserCheckAuthorization,
  IUserErrorOpenSnack,
  IUserAuthorizedErrorAction,
  ICategoriesLoading,
  IGetAllCategories,
  IGetPartOfCategories,
  ICategoriesErrors,
  ICategoriesCloseSnack,
  IProductsLoading,
  IGetAllProducts,
  IGetPartOfProducts,
  IFindProduct,
  IProductsErrors,
  IProductsCloseSnack,
  IProductsGetShoppingCart,
  IChangeCartProductAmount,
  IAddOrRemoveProductFromShoppingCart,
  IClearShoppingCart,
  IGetFavoritesProduts,
  IAddOrRemoveProductFromFavorite,
  ISaveFavoritesIdInLocalStorage,
  IDeleteFavoriFromLocalStorage,
  IGetFavoriteFromLocalStorage,
  IGetProductsByArrayId,
  IClearFavoriteLocalStorage,
  IClearFavorite,
} from './interfaces'

export type UserActionType =
  | IStartLoading
  | IUserRegistrate
  | IUserLogin
  | IUserLogout
  | IUserForgot
  | IUserRestore
  | IUserEdit
  | IUserErrorOpenSnack
  | IUserAuthorizedErrorAction
  | IUserCheckAuthorization
  | IChangeCartProductAmount
  | IAddOrRemoveProductFromShoppingCart
  | IClearShoppingCart
  | IAddOrRemoveProductFromFavorite
  | ISaveFavoritesIdInLocalStorage
  | IDeleteFavoriFromLocalStorage
  | IGetFavoriteFromLocalStorage
  | IClearFavoriteLocalStorage
  | IClearFavorite

export type CategoriesActionType =
  | ICategoriesLoading
  | IGetAllCategories
  | IGetPartOfCategories
  | ICategoriesErrors
  | ICategoriesCloseSnack

export type ProductsActionType =
  | IProductsLoading
  | IGetAllProducts
  | IGetPartOfProducts
  | IFindProduct
  | IProductsErrors
  | IProductsCloseSnack
  | IProductsGetShoppingCart
  | IGetFavoritesProduts
  | IGetProductsByArrayId
