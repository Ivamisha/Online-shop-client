import { FC, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { Outlet } from 'react-router-dom'
import { Box, Drawer, Grid, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { drawerWidth } from '../../constants'
import { ProfilePanelList, ProfileHeader } from '..'

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
      marginTop: '300px',
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
  mainContainer: {
    '&.MuiGrid-root': {
      background: '#FBFBFB',
      height: '100vh',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  },
}))

const ProfileLayout: FC = () => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: 'black',
            },
          }}
        >
          <ProfilePanelList />
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: 'black',
            },
          }}
          open
        >
          <ProfilePanelList />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth})` }, height: '100vh' }}
      >
        <Grid container flexDirection="column">
          <Grid
            container
            className={classes.mainContainer}
            alignItems="space-between"
            flexDirection="column"
            width="100%"
          >
            <Grid item>
              <ProfileHeader setOpenDrawer={setMobileOpen} />
            </Grid>

            <Grid flexGrow={1} className={classes.outletContainer}>
              <Outlet />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default ProfileLayout
