import { FC, useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { Grid, Theme } from '@mui/material'
import { useActions, useTypeSelector } from '../../hooks'
import { Header, Footer, Preloader, TemporaryDrawer } from '../../Components'

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    '&.MuiGrid-root': {
      background: theme.palette.secondary.main,
      height: '100vh',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  },
  outletContainer: {
    display: 'flex',
    width: '80%',
    alignSelf: 'center',
    [theme.breakpoints.down('xl')]: {
      maxHeight: '50vh',
    },
  },
}))

const Layout: FC = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const classes = useStyles()
  const { isLoading } = useTypeSelector((state) => state.user)
  const { getFavoritesFromLocalStorage } = useActions()

  useEffect(() => {
    getFavoritesFromLocalStorage()
  }, [])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      <Grid
        item
        display="flex"
        className={classes.mainContainer}
        flexDirection="column"
        width="100%"
      >
        <Grid item>
          <Header setOpenDrawer={setOpenDrawer} />
        </Grid>

        <Grid item flexGrow={1} className={classes.outletContainer}>
          <Outlet />
        </Grid>

        <Grid item>
          <Footer />
        </Grid>
      </Grid>
      <TemporaryDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  )
}

export default Layout
