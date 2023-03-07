import { FC } from 'react'
import { Grid, Typography, Theme } from '@mui/material'
import { UserInformation, UserNavigationPanel } from '../../Components'
import type { IUserPageProps } from './interface'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    '&.MuiGrid-root': {
      flexDirection: 'column',
      background: theme.palette.secondary.gray,
      borderRadius: '20px',
    },
  },
}))

const UserPage: FC<IUserPageProps> = () => {
  const classes = useStyles()

  return (
    <>
      <Grid container m={3} p={3}>
        <Grid item xs={12}>
          <Grid container className={classes.container} justifyContent="center">
            <Grid item xs={12} textAlign="center">
              <Typography variant="h4" fontWeight="bold" pb={5} pt={2}>
                Личная информация
              </Typography>

              <Grid item xs={12}>
                <UserInformation />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} mt={7}>
          <UserNavigationPanel />
        </Grid>
      </Grid>
    </>
  )
}
export default UserPage
