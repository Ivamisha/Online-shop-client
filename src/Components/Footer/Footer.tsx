import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { Grid, Theme, Typography } from '@mui/material'
import { logo } from '../../img'

export const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    '&.MuiGrid-root': {
      backgroundColor: theme.palette.primary.white,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'nowrap',
    },
  },
  fontStyle: {
    '&.MuiTypography-root': {
      color: theme.palette.secondary.main,
    },
  },
  images: {
    '&.MuiGrid-root': {
      display: 'flex',
      width: 90,
      height: 90,
      cursor: 'pointer',
    },
  },
}))

const Footer: FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  return (
    <Grid container className={classes.footer} spacing={1}>
      <Grid
        item
        ml={5}
        component="img"
        src={logo}
        alt="footerLogo"
        className={classes.images}
        onClick={() => navigate('/main')}
      />

      <Grid item lg={6}>
        <Grid container justifyContent="space-between" alignItems="center" />
      </Grid>

      <Grid item>
        <Link to="#">
          <Typography className={classes.fontStyle} mr={5}>
            Все права защищены
          </Typography>
        </Link>
      </Grid>
    </Grid>
  )
}

export default Footer
