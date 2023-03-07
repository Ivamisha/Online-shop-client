import { FC } from 'react'
import { Grid, Typography, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'
import { useTypeSelector } from '../../hooks'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    '&.MuiGrid-root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
  },
  box: {
    '&.MuiBox-root': {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      background: theme.palette.primary.main,
    },
  },
  linksBox: {
    '&.MuiGrid-root': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '150px',
    },
  },
  outletContainer: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('xl')]: {
      maxHeight: '100vh',
    },
    alignItems: 'flex-start',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: '100px',
    color: theme.palette.primary.main,
  },
}))

const ProfilePanelList: FC = () => {
  const classes = useStyles()
  const { user } = useTypeSelector((state) => state.user)

  return (
    <>
      <Grid item xs={12} textAlign="center" pt={7}>
        <Typography color="primary.main" variant="h4">
          Личный кабинет
        </Typography>
      </Grid>

      <Grid item className={classes.linksBox}>
        {user && (
          <>
            <Link className={classes.links} to="user">
              Личная информация
            </Link>

            <Link className={classes.links} to="edit">
              Редактировать
            </Link>
          </>
        )}

        <Link className={classes.links} to="/products">
          Продукты
        </Link>

        <Link className={classes.links} to="favorite">
          Избранное
        </Link>

        <Link className={classes.links} to="cart">
          Корзина
        </Link>
      </Grid>
    </>
  )
}
export default ProfilePanelList
