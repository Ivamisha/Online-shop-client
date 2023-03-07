import { FC } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, IconButton, Typography, Theme } from '@mui/material'
import { useActions } from '../../hooks'
import type { ICounterProps } from './interface'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

const useStyles = makeStyles((theme: Theme) => ({
  counterContainer: {
    '&.MuiGrid-root': {
      background: theme.palette.primary.white,
      alignItems: 'center',
      border: '1px solid black',
      borderRadius: '10px',
    },
  },
}))

const Counter: FC<ICounterProps> = ({ count, maxValue, productId, setCount, setActiveCount }) => {
  const { changeCartProudctAmount, addOrRemoveProductFromCart } = useActions()
  const classes = useStyles()

  const changeProductAmount = async (flag: 'inc' | 'dec', value: number) => {
    if (flag === 'inc' && value <= maxValue) {
      setCount(value)
      changeCartProudctAmount(value, productId)
    }

    if (flag === 'dec' && value > 0) {
      setCount(value)
      changeCartProudctAmount(value, productId)
    }

    if (value === 0 && setActiveCount) {
      addOrRemoveProductFromCart(productId, false)
      setActiveCount(false)
    }
  }

  return (
    <Grid container className={classes.counterContainer} width={100} height={50}>
      <IconButton onClick={() => changeProductAmount('dec', count - 1)}>
        <RemoveIcon />
      </IconButton>

      <Typography>{count}</Typography>

      <IconButton onClick={() => changeProductAmount('inc', count + 1)}>
        <AddIcon />
      </IconButton>
    </Grid>
  )
}
export default Counter
