import { FC } from 'react'
import { Typography, Theme, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { IUserTextProps } from './interface'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    '&.MuiGrid-root': {
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid black',
    },
  },
  typographyTitle: {
    '&.MuiTypography-root': {
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
  typographyValue: {
    '&.MuiTypography-root': {
      fontSize: '20px',
      paddingLeft: '1rem',
    },
  },
}))

const UserText: FC<IUserTextProps> = ({ title, value }) => {
  const classes = useStyles()

  return (
    <>
      <Typography className={classes.typographyTitle}>{title}</Typography>
      <Typography className={classes.typographyValue}>{value}</Typography>
    </>
  )
}

export default UserText
