import { FC, useEffect, useState } from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Theme,
  CardMedia,
  CardActions,
  IconButton,
  Button,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useActions, useTypeSelector } from '../../../hooks'
import { Counter } from '../../'
import type { IProductsDate } from '../../../models/redux'
import type { IProductItemProps } from './interface'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'

export const useStyles = makeStyles((theme: Theme) => ({
  cardFormStyle: {
    '&.MuiCard-root': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
    '&.MuiPaper-root': {
      width: '250px',
      mr: 10,
      mb: 2,
    },
  },
  gridFormStyle: {
    '&.MuiGrid-root': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
  },
  productName: {
    '&.MuiGrid-root': {
      flexBasis: '95%',
      maxWidth: '95%',
    },
  },
  productCost: {
    '&.MuiTypography-root': {
      fontSize: 14,
    },
  },
  svgChosenStyle: {
    '&.MuiSvgIcon-root': {
      color: 'red',
    },
  },
  button: {
    '&.MuiButton-root': {
      background: 'blue',
      '&:hover': {
        background: theme.palette.secondary.green,
        color: theme.palette.secondary.main,
      },
    },
  },
  favoriteIcon: {
    '&.MuiSvgIcon-root': {
      color: 'red',
    },
  },
}))

const ProductItem: FC<IProductItemProps> = ({ product, openSnack }) => {
  const [activeCount, setActiveCount] = useState(false)
  const classes = useStyles()
  const {
    addOrRemoveProductFromCart,
    addOrRemoveProductFavorite,
    saveFavoritesInLocalStorage,
    deleteProductFromLocalStorage,
  } = useActions()
  const { user, unauthorizedFavorite } = useTypeSelector((state) => state.user)
  const [activeFavoriteIcon, setActiveFavoriteIcon] = useState<boolean>(
    !!unauthorizedFavorite.some((id) => id === product.id)
  )
  const [count, setCount] = useState<number>(0)

  const addProductToShoppingCart = (status: boolean, productId: string) => {
    addOrRemoveProductFromCart(productId, status)
    setActiveCount(true)
    setCount(count + 1)
  }

  useEffect(() => {
    if (user) {
      setActiveFavoriteIcon(!!user.favorites.find((element) => element === product.id))
      const shoppingCartProduct = user?.shoppingCart.find(
        (element) => element.productId === product.id
      )
      if (shoppingCartProduct) {
        setActiveCount(true)
        setCount(shoppingCartProduct?.amount as number)
      }
    }
  }, [user?.favorites])

  const addToFavorite = (flag: boolean) => {
    if (user) {
      addOrRemoveProductFavorite(product.id, activeFavoriteIcon ? false : true)
      setActiveFavoriteIcon(!activeFavoriteIcon)
    }
    if (!user) {
      flag ? deleteProductFromLocalStorage(product.id) : saveFavoritesInLocalStorage(product.id)
      setActiveFavoriteIcon(!flag)
    }
  }

  return (
    <Grid item xs={3} width={500}>
      <Card sx={{ mr: 10, mb: 2, p: 2, width: '250px' }} className={classes.cardFormStyle}>
        <CardActionArea onClick={() => openSnack(product as unknown as IProductsDate)}>
          <CardMedia
            component="img"
            image={'media/image/' + product.picture}
            alt="product-picture"
            width="200px"
            height="100px"
          />

          <CardContent>
            <Typography className={classes.productName}>Name: {product.name}</Typography>

            <Typography className={classes.productCost}>Cost: {product.price}</Typography>
          </CardContent>
        </CardActionArea>

        <CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={() => addToFavorite(activeFavoriteIcon)}>
              {!activeFavoriteIcon ? (
                <FavoriteBorderOutlinedIcon fontSize="large" />
              ) : (
                <FavoriteIcon fontSize="large" className={classes.favoriteIcon} />
              )}
            </IconButton>

            {activeCount && (
              <Counter
                maxValue={+product.quantity}
                productId={product.id}
                setCount={setCount}
                count={count}
                setActiveCount={setActiveCount}
              />
            )}

            {!activeCount && (
              <Button
                className={classes.button}
                onClick={() => addProductToShoppingCart(true, product.id)}
              >
                Купить
              </Button>
            )}
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ProductItem
