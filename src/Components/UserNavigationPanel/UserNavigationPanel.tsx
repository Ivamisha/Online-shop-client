import { FC, useState } from 'react'
import { Grid, Typography, Theme } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTypeSelector } from '../../hooks'
import { makeStyles } from '@mui/styles'
import { totalAmountChecker } from '../../helpers/productsChecker'
import type { IUser } from '../../models/redux'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff'
import EditIcon from '@mui/icons-material/Edit'

const useStyles = makeStyles((theme: Theme) => ({
  infoBox: {
    '&.MuiGrid-root': {
      display: 'flex',
      flexDirection: 'column',
      height: '10rem',
      justifyContent: 'center',
      borderRadius: '13px',
      alignItems: 'center',
      background: '#efefef',
      border: '1px solid black',
    },
  },
  typographyValue: {
    '&.MuiTypography-root': {
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
}))

const UserNavigationPanel: FC = () => {
  const { user } = useTypeSelector((state) => state.user)
  const [totalAmountCart, setTotalAmountCart] = useState<number>(totalAmountChecker(user as IUser))
  const classes = useStyles()

  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={3.5} className={classes.infoBox}>
        <Grid container textAlign="center" alignItems="center" justifyContent="center" p={3}>
          <Grid container flexDirection="column" alignItems="center">
            <FavoriteIcon />

            <Grid item xs={12} display="flex">
              <Typography pl={2}>Количество продуктов в избранном:</Typography>

              <Typography fontWeight="bold" pl={2}>
                25
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={3.5} className={classes.infoBox}>
        <Grid container textAlign="center" alignItems="center" justifyContent="center" p={3}>
          <Grid container flexDirection="column" alignItems="center">
            <ShoppingCartIcon />

            <Grid item xs={12} display="flex">
              <Typography pl={2}>Количество продуктов в Корзине:</Typography>

              <Typography fontWeight="bold" pl={2}>
                {totalAmountCart}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={3.5} className={classes.infoBox}>
        <Grid container textAlign="center" alignItems="center" justifyContent="center" p={3}>
          <Grid container flexDirection="column" alignItems="center">
            <HistoryToggleOffIcon />

            <Grid item xs={12} display="flex">
              <Typography pl={2}>Количество продуктов в избранном</Typography>

              <Typography fontWeight="bold" pl={2}>
                25
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid margin="0 auto" className={classes.infoBox} mt={3} display="flex" alignSelf="center">
        <Grid
          container
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={3}
        >
          <EditIcon />

          <Link to="../edit">Изменить личную информацию</Link>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default UserNavigationPanel
