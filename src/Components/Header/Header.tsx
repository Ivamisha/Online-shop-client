import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { AppBar, Box, IconButton, Toolbar, Badge, Grid, Menu, MenuItem, Theme } from '@mui/material'
import { useActions, useTypeSelector } from '../../hooks'
import { SearchComponent } from '../../Components'
import type { IHeaderProps } from './interface'
import { logo } from '../../img'
import { totalAmountChecker } from '../../helpers/productsChecker'
import MenuIcon from '@mui/icons-material/Menu'
import CartIcon from '@mui/icons-material/ShoppingCart'
import AccountIcon from '@mui/icons-material/AccountCircle'
import FavoriteIcon from '@mui/icons-material/Favorite'

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    '&.MuiBox-root': {
      mt: 1,
      maxWidth: 70,
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
  },
  header: {
    '&.MuiToolbar-root': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  position: {
    '&.MuiGrid-root': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  menu: {
    '&.MuiList-root MuiList-padding MuiMenu-list': {
      backgroundColor: 'white',
    },
  },
  box: {
    '&.MuiBox-root': {
      backgroundColor: 'white',
    },
  },
  cart: {
    '&.MuiIconButton-root': {
      color: theme.palette.secondary.main,
      size: 'large',
    },
  },
  account: {
    '&.MuiIconButton-root': {
      color: theme.palette.secondary.main,
      size: 'large',
    },
  },
}))

const Header: FC<IHeaderProps> = ({ setOpenDrawer }) => {
  const { isAuth, user, unauthorizedFavorite } = useTypeSelector((state) => state.user)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [shoppingListAmount, setShoppingListAmount] = useState<number>(0)
  const [favoriteAmount, setFavoriteAmount] = useState<number | undefined>()
  const navigate = useNavigate()
  const { logout } = useActions()
  const classes = useStyles()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (user) {
      setShoppingListAmount(totalAmountChecker(user))
      setFavoriteAmount(user.favorites.length)
    }
    if (!user) {
      setFavoriteAmount(unauthorizedFavorite.length)
    }
  }, [user, unauthorizedFavorite])

  return (
    <Grid container position="static">
      <AppBar>
        <Toolbar className={classes.header}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item className={classes.position}>
              <Box
                component="img"
                alt="logo"
                src={logo}
                className={classes.icon}
                onClick={() => navigate('/main')}
                ml={8}
                mr={8}
              />

              <IconButton
                onClick={() => setOpenDrawer(true)}
                size="medium"
                edge="start"
                color="secondary"
                aria-label="open-drawer"
              >
                <MenuIcon />
              </IconButton>
            </Grid>

            <Grid item xl={7} sm={7}>
              <SearchComponent />
            </Grid>

            <Grid item xl={2} sm={2}>
              <IconButton onClick={() => navigate('../profile/favorite')} className={classes.cart}>
                <Badge badgeContent={favoriteAmount} color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>

              <IconButton onClick={() => navigate('../profile/cart')} className={classes.cart}>
                <Badge badgeContent={shoppingListAmount} color="error">
                  <CartIcon />
                </Badge>
              </IconButton>

              <IconButton className={classes.account} onClick={handleClick}>
                <AccountIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.menu}
              >
                {!isAuth && (
                  <Box className={classes.box}>
                    <MenuItem onClick={() => navigate('/signUp')}>Регистрация</MenuItem>

                    <MenuItem onClick={() => navigate('/login')}>Войти</MenuItem>
                  </Box>
                )}

                {isAuth && (
                  <Box className={classes.box}>
                    <MenuItem className={classes.menu} onClick={logout}>
                      Выйти из системы
                    </MenuItem>

                    <MenuItem className={classes.menu} onClick={() => navigate('/profile')}>
                      Профиль
                    </MenuItem>
                  </Box>
                )}
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  )
}

export default Header
