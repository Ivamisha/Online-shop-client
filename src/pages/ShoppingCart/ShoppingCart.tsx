import { Grid, Theme, Button } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { useTypeSelector, useActions } from '../../hooks'
import { CartInformation, CartItem } from '../../Components/'
import { totalAmountChecker, totalCostChecker } from '../../helpers/productsChecker'
import type { IProductsDate } from '../../models/redux'
import type { IUser } from '../../models/redux'

const useStyles = makeStyles((theme: Theme) => ({
  CardItem: {
    '&.MuiGrid-root': {
      borderRadius: '10px',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  mainContainer: {
    '&.MuiGrid-root': {
      borderRadius: '10px',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '1300px',
    },
  },
  shoppingCartContainer: {
    '&.MuiGrid-root': {
      borderRadius: '10px',
      background: theme.palette.primary.main,
      minHeight: '500px',
    },
  },
  button: {
    '&.MuiButton-root': {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.main,
      margin: '1rem 1rem 0 0',
      '&:hover': {
        background: theme.palette.secondary.green,
        color: theme.palette.secondary.main,
      },
    },
  },
}))

const ShoppingCard: FC = () => {
  const classes = useStyles()
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const { user } = useTypeSelector((state) => state.user)
  const { shoppingCart } = useTypeSelector((state) => state.products)
  const { getProductCart } = useActions()
  const { clearShoppingCart } = useActions()

  useEffect(() => {
    getProductCart()
    setTotalAmount(totalAmountChecker(user as IUser))
  }, [user])

  return (
    <Grid container className={classes.mainContainer}>
      <Grid item className={classes.shoppingCartContainer} xs={8}>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button className={classes.button} onClick={clearShoppingCart}>
            Очистить корзину
          </Button>
        </Grid>

        <Grid item xs={11} className={classes.CardItem}>
          {shoppingCart?.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </Grid>
      </Grid>

      <Grid item>
        <CartInformation
          totalCost={totalCostChecker(shoppingCart as unknown as IProductsDate[], user)}
          totalAmount={totalAmount}
        />
      </Grid>
    </Grid>
  )
}
export default ShoppingCard
