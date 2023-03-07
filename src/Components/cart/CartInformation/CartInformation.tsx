import { FC } from 'react'
import { Grid, Typography, Button, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { ICartInformationProps } from './interface'

const useStyles = makeStyles((theme: Theme) => ({
  CardItem: {
    '&.MuiGrid-root': {
      border: '1px solid black',
      borderRadius: '10px',
      alignItems: 'center',
      background: 'white',
    },
  },
  button: {
    '&.MuiButton-root': {
      background: theme.palette.secondary.main,
      height: '70px',
      '&:hover': {
        background: theme.palette.secondary.green,
        color: theme.palette.secondary.main,
      },
    },
  },
  textInformation: {
    '&.MuiGrid-root': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderBottom: 'solid',
    },
  },
}))

const CartInformation: FC<ICartInformationProps> = ({ totalAmount, totalCost }) => {
  const classes = useStyles()

  return (
    <Grid container width={400} height={400} className={classes.CardItem} p={2}>
      <Grid item md={12} borderBottom="solid">
        <Typography fontSize={25} fontWeight="bold">
          Условия заказа
        </Typography>
      </Grid>

      <Grid item md={12} className={classes.textInformation}>
        <Typography pb={4}>Количество товаров: {totalAmount} </Typography>
        <Typography>Итого: {totalCost} рублей </Typography>
      </Grid>

      <Grid item md={12}>
        <Button fullWidth className={classes.button}>
          Перейти к оформлению
        </Button>
      </Grid>
    </Grid>
  )
}
export default CartInformation
