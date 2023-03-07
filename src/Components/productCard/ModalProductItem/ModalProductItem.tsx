import { FC } from 'react'
import { Grid, Typography, Theme, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddCart from '@mui/icons-material/AddShoppingCart'
import type IProductItemProps from './interface'

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
}))

const ModalProductItem: FC<IProductItemProps> = ({ product }) => {
  const classes = useStyles()

  return (
    <Grid container alignItems="center" justifyContent="center" mt={30}>
      <Grid item className={classes.gridFormStyle} width="60%" height="400px">
        <Grid item ml={40} mt={5}>
          <Typography>{product.name}</Typography>
        </Grid>

        <Grid item width="200px" height="100px">
          {product.picture}
        </Grid>

        <Grid item ml={60} mt={5}>
          <Typography>{product.price}</Typography>

          <Typography>{product.description}</Typography>

          <Grid item ml={5} mt={10}>
            <IconButton>
              <FavoriteIcon />
            </IconButton>

            <IconButton>
              <AddCart />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ModalProductItem
