import { Grid, Theme, Button } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { useTypeSelector, useActions } from '../../hooks'
import { CartInformation, FavoriteItem } from '../../Components/'
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
      display: 'flex',
      borderRadius: '10px',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  shoppingCartContainer: {
    '&.MuiGrid-root': {
      borderRadius: '10px',
      background: theme.palette.primary.main,
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

const Favorites: FC = () => {
  const classes = useStyles()
  const { user, unauthorizedFavorite } = useTypeSelector((state) => state.user)
  const { favorites } = useTypeSelector((state) => state.products)
  const { getFavoriteProducts, getProductByArrayId, clearFavorite } = useActions()
  const { clearFavoriteLocalStorage } = useActions()

  useEffect(() => {
    if (user) {
      getFavoriteProducts()
    }
    if (!user) {
      getProductByArrayId('favorites')
    }
  }, [user, unauthorizedFavorite])

  const clearFavorites = () => {
    !user ? clearFavoriteLocalStorage() : clearFavorite()
  }

  return (
    <Grid container className={classes.mainContainer}>
      <Grid item className={classes.shoppingCartContainer} xs={8}>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button className={classes.button} onClick={clearFavorites}>
            Очистить избранное
          </Button>
        </Grid>

        <Grid item xs={12} className={classes.CardItem}>
          {favorites?.map((product) => (
            <FavoriteItem key={product.id} product={product} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Favorites
