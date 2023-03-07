import { FC, useState } from 'react'
import { Grid, Typography, Button, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { CardItemProps } from './interface'
import Counter from '../../Counter/Counter'
import { useActions, useTypeSelector } from '../../../hooks'

export const useStyles = makeStyles((theme: Theme) => ({
  cardItem: {
    '&.MuiGrid-root': {
      alignItems: 'center',
      background: 'white',
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
  productNameContainer: {
    '&.MuiGrid-root': {
      display: 'flex',
      alignContent: 'flex-start',
    },
  },
}))

const CartItem: FC<CardItemProps> = ({ product }) => {
  const { user } = useTypeSelector((state) => state.user)
  const { addOrRemoveProductFromCart } = useActions()
  const productInCart = user?.shoppingCart.find((element) => element.productId === product.id)
  const [count, setCount] = useState<number>(productInCart?.amount as number)
  const classes = useStyles()

  return (
    <Grid container className={classes.cardItem} height={150} m={1} p={1}>
      <Grid item md={2}>
        <img src={'/media/image/' + product.picture} alt="picture" width={150} />
      </Grid>

      <Grid item md={6} pl={3}>
        <Grid container>
          <Grid item md={12} pb={2} pl={1} className={classes.productNameContainer}>
            <Typography fontSize={21} fontWeight="bold">
              {product.name}
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Button
              className={classes.button}
              onClick={() => addOrRemoveProductFromCart(product.id, false)}
            >
              Удалить из корзины
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item md={4}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Counter
              count={count}
              maxValue={product.quantity}
              setCount={setCount}
              productId={product.id}
            />
          </Grid>

          <Grid item>
            <Typography>Стоимость: {product.price}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default CartItem
