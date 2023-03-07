import { FC, useState } from 'react'
import { Grid, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ProfileLayout, Preloader, ProfileDrawer, ProfileHeader } from '../../Components'
import { useTypeSelector } from '../../hooks'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    '&.MuiGrid-root': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  mainContainer: {
    '&.MuiGrid-root': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
  },
  panel: {
    '&.MuiGrid-root': {
      width: 'calc(100% - 250px)',
      height: '80vh',
    },
  },
}))

const Personal: FC = () => {
  const classes = useStyles()
  const { isLoading } = useTypeSelector((state) => state.user)

  if (isLoading) {
    return <Preloader />
  }

  return <ProfileLayout />
}

export default Personal
