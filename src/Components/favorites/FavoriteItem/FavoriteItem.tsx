import { FC, useState } from 'react'
import { Grid, Typography, Button, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { IFavoriteItemProps } from './interface'
import Counter from '../../Counter/Counter'
import { useActions, useTypeSelector } from '../../../hooks'

export const useStyles = makeStyles((theme: Theme) => ({
  cardItem: {
    '&.MuiGrid-root': {
      alignItems: 'center',
      background: 'white',
      border: '1px solid black',
      borderRadius: '10px',
    },
  },
  button: {
    '&.MuiButton-root': {
      background: theme.palette.secondary.main,
      '&:hover': {
        background: theme.palette.secondary.green,
        color: theme.palette.secondary.main,
      },
    },
  },
  disabledbutton: {
    '&.MuiButton-root': {
      border: '2px solid black',
      color: theme.palette.secondary.main,
    },
  },
  productNameContainer: {
    '&.MuiGrid-root': {
      display: 'flex',
      alignContent: 'flex-start',
    },
  },
}))

const FavoriteItem: FC<IFavoriteItemProps> = ({ product }) => {
  const { user } = useTypeSelector((state) => state.user)
  const { addOrRemoveProductFavorite, addOrRemoveProductFromCart, deleteProductFromLocalStorage } =
    useActions()
  const productInCart = user?.shoppingCart.find((element) => element.productId === product.id)
  const classes = useStyles()

  const removeItemFromFavorite = () => {
    user ? addOrRemoveProductFavorite(product.id, false) : deleteProductFromLocalStorage(product.id)
  }

  return (
    <Grid container className={classes.cardItem} height={150} m={1} p={1}>
      <Grid item md={2}>
        <img src={'/media/image/' + product.picture} alt="picture" width={130} />
      </Grid>

      <Grid item md={6} pl={3}>
        <Grid container>
          <Grid item md={12} pb={2} pl={1} className={classes.productNameContainer}>
            <Typography fontSize={21} fontWeight="bold">
              {product.name}
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Button className={classes.button} onClick={removeItemFromFavorite}>
              Удалить из избранного
            </Button>
          </Grid>

          <Grid item md={6}>
            {!productInCart ? (
              <Button
                className={classes.button}
                onClick={() => addOrRemoveProductFromCart(product.id, true)}
              >
                Добавить в корзину
              </Button>
            ) : (
              <Button disabled className={classes.disabledbutton}>
                Товар добавлен в корзину
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid item md={4} display="flex" justifyContent="center">
        <Grid item display="flex">
          <Typography fontSize={20} pr={2}>
            Стоимость:
          </Typography>
          <Typography fontSize={20} fontWeight="bold">
            {product.price} р
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default FavoriteItem
