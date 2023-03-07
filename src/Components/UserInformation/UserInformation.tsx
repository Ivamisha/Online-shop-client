import { FC } from 'react'
import { UserText } from '../'
import { useTypeSelector } from '../../hooks'
import { Grid, Typography, Avatar, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    '&.MuiGrid-root': {
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid black',
    },
  },
}))

const UserInformation: FC = () => {
  const classes = useStyles()
  const { user } = useTypeSelector((state) => state.user)

  return (
    <Grid container>
      <Grid item xs={3} pl={2} mb={2}>
        <Avatar
          alt="users"
          src={'/media/image/' + user?.userAvatar}
          sx={{ width: 250, height: 250 }}
        />
      </Grid>

      <Grid item xs={9} display="flex" pr={5}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} className={classes.container}>
            <UserText title="Имя:" value={user?.name} />
          </Grid>

          <Grid item xs={12} className={classes.container}>
            <UserText title="Фамилия:" value={user?.surname} />
          </Grid>

          <Grid item xs={12} className={classes.container}>
            <UserText title="Телефон:" value={user?.phoneNumber} />
          </Grid>

          <Grid item xs={12} className={classes.container}>
            <UserText title="Электронная почта:" value={user?.email} />
          </Grid>

          <Grid item xs={12} className={classes.container}>
            <UserText title="Адрес:" value={user?.address} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default UserInformation
