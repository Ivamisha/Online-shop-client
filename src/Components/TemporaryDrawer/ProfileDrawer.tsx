import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Drawer, Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { ITemporaryDrawer } from './interface'
import { logo } from '../../img'

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    '&.MuiBox-root': {
      maxWidth: 80,
      height: 75,
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
  },
  box: {
    '&.MuiBox-root': {
      p: '20px',
      marginTop: '50px',
      width: '250px',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      role: 'presentation',
    },
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '100px',
    fontSize: '25px',
    fontWeight: 'bold',
  },
}))

const ProfileDrawer: FC<ITemporaryDrawer> = ({ openDrawer, setOpenDrawer }) => {
  const navigate = useNavigate()
  const classes = useStyles()

  return (
    <Box>
      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box className={classes.box}>
          <Box
            component="img"
            alt="logo"
            src={logo}
            className={classes.icon}
            onClick={() => navigate('/main')}
            ml={11}
            mb={20}
          />

          <Box className={classes.links}>
            <Link to="/main" onClick={() => setOpenDrawer(false)}>
              <Typography className={classes.links}>На главную</Typography>
            </Link>

            <Link to="/products" onClick={() => setOpenDrawer(false)}>
              <Typography className={classes.links}>Продукты</Typography>
            </Link>

            <Link to="/cart" onClick={() => setOpenDrawer(false)}>
              <Typography className={classes.links}>Корзина</Typography>
            </Link>
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

export default ProfileDrawer
