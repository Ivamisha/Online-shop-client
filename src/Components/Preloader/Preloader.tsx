import { FC } from 'react'
import { CircularProgress, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { theme } from '../../theme'

const useStyles = makeStyles({
  preloaderBox: {
    '&.MuiBox-root': {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
    },
  },
  preloader: {
    '&.MuiCircularProgress-root': {
      color: theme.palette.secondary.green,
      display: 'flex',
      margin: '0 auto',
      marginTop: '1rem',
    },
  },
})

const Preloader: FC = () => {
  const classes = useStyles()

  return (
    <Box className={classes.preloaderBox}>
      <CircularProgress className={classes.preloader} size={100} />
    </Box>
  )
}

export default Preloader
