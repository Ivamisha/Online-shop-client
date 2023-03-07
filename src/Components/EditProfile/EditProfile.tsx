import { FC, useState } from 'react'
import { Grid, TextField, Typography, Theme, Avatar, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Preloader } from '../'
import { useActions, useTypeSelector } from '../../hooks'
import { IEditFormInputs } from './interface'
import { editScheme } from '../../helpers/validator'
import { inputsForEdit } from '../../constants'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    '&.MuiGrid-root': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  avatar: {
    '&.MuiAvatar-root': {
      backgroundColor: theme.palette.primary.red,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  inputs: {
    '&.MuiTextField-root': {
      margin: 20,
    },
  },
  button: {
    '&.MuiButton-root': {
      backgroundColor: theme.palette.secondary.main,
      marginTop: '1rem',
    },
  },
  label: {
    '&.MuiTypography-root': {
      color: theme.palette.secondary.main,
    },
  },
}))

const EditProfile: FC = () => {
  const navigate = useNavigate()
  const classes = useStyles()
  const { user } = useTypeSelector((state) => state.user)
  const { isLoading } = useTypeSelector((state) => state.user)
  const { editUser } = useActions()
  const [changingImage, setChangingImage] = useState<File>()
  const defaultValues = {
    name: user?.name,
    surname: user?.surname,
    email: user?.email,
    address: user?.address,
    phoneNumber: user?.phoneNumber,
    userAvatar: undefined,
  }

  const onSubmit: SubmitHandler<IEditFormInputs> = (data) => {
    const formData = new FormData()
    formData.append('file', data.userAvatar[0])
    formData.append('name', data.name)
    formData.append('surname', data.surname)
    formData.append('email', data.email)
    formData.append('address', data.address)
    formData.append('phoneNumber', data.phoneNumber)
    editUser(formData)
    navigate('../user')
  }

  const {
    formState: { errors },
    handleSubmit,
    control,
    register,
  } = useForm<IEditFormInputs>({
    resolver: yupResolver(editScheme),
    defaultValues,
  })

  if (isLoading) {
    return <Preloader />
  }

  return (
    <Grid container className={classes.container} flexDirection="column">
      <Grid item xs={12}>
        <Typography variant="h4" fontWeight="bold" className={classes.label}>
          Редактировать профиль
        </Typography>
      </Grid>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item display="flex">
          <Grid container justifyContent="space-around">
            <Grid
              item
              xs={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Avatar
                alt="users"
                src={
                  changingImage
                    ? URL.createObjectURL(changingImage)
                    : '/media/image/' + user?.userAvatar
                }
                sx={{ width: 320, height: 320 }}
              />

              <Controller
                name="userAvatar"
                control={control}
                render={({ field: {} }) => (
                  <TextField
                    type="file"
                    inputProps={{ accept: 'image/*' }}
                    {...register('userAvatar', {
                      maxLength: 1,
                      onChange: (e) => setChangingImage(e.target.files[0]),
                    })}
                    error={!!errors.userAvatar}
                    helperText={errors.userAvatar?.message ? errors.userAvatar?.message : null}
                    sx={{ pt: 3 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} pt={4}>
              {inputsForEdit.map(({ label, inputName, type }, index) => (
                <Controller
                  key={index}
                  name={inputName}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label={label}
                      variant="filled"
                      size="small"
                      color="primary"
                      type={type}
                      error={!!errors[inputName]}
                      margin="dense"
                      fullWidth
                      helperText={errors[inputName] ? errors[inputName]?.message : null}
                      {...field}
                    />
                  )}
                />
              ))}

              <Button className={classes.button} type="submit" variant="contained">
                Редактировать
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}

export default EditProfile
