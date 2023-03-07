import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Box, Drawer, Typography, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { CategoryList } from '../../Components'
import type { ITemporaryDrawer } from './interface'

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

const TemporaryDrawer: FC<ITemporaryDrawer> = ({ openDrawer, setOpenDrawer }) => {
  const classes = useStyles()

  return (
    <Box>
      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box className={classes.links} p={2} width="250px" textAlign="center" role="presentation">
          <CategoryList />

          <Link to="products" onClick={() => setOpenDrawer(false)}>
            <Typography className={classes.links}>Продукты</Typography>
          </Link>
        </Box>
      </Drawer>
    </Box>
  )
}

export default TemporaryDrawer
