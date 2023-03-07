import { FC, useState } from 'react'
import { Box, IconButton, Toolbar, Grid, Menu, MenuItem, Theme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { useActions, useTypeSelector } from '../../hooks'
import type { IHeaderProps } from './interface'
import MenuIcon from '@mui/icons-material/Menu'
import AccountIcon from '@mui/icons-material/AccountCircle'

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    '&.MuiToolbar-root': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  position: {
    '&.MuiGrid-root': {},
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
  account: {
    '&.MuiIconButton-root': {
      color: theme.palette.secondary.main,
      size: 'large',
    },
  },
}))

const ProfileHeader: FC<IHeaderProps> = ({ setOpenDrawer }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const { user } = useTypeSelector((state) => state.user)
  const { logout } = useActions()
  const classes = useStyles()
  const isOpen = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Toolbar className={classes.header}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item className={classes.position}>
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

        <Grid item>
          <IconButton className={classes.account} onClick={handleClick}>
            <AccountIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} className={classes.menu}>
            <Box className={classes.box}>
              {user ? (
                <MenuItem className={classes.menu} onClick={logout}>
                  Выйти из системы
                </MenuItem>
              ) : (
                <MenuItem
                  className={classes.menu}
                  onClick={() => {
                    navigate('../login')
                  }}
                >
                  Авторизация
                </MenuItem>
              )}
            </Box>
          </Menu>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default ProfileHeader
