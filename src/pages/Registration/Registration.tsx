import { FC } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { makeStyles } from '@mui/styles'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Snackbar,
  Link,
  Checkbox,
  Theme,
} from '@mui/material'
import { useActions, useTypeSelector } from '../../hooks'
import { inputsForLoginRegistrate } from '../../constants'
import { logo } from '../../img'
import { registrationScheme } from '../../helpers/validator'
import type { IRegistrateFormInputs } from './interface'

export const useStyles = makeStyles((theme: Theme) => ({
  background: {
    '&.MuiGrid-root': {
      background: theme.palette.secondary.main,
    },
  },

  button: {
    '&.MuiButton-root': {
      display: 'flex',
      width: '70%',
      margin: '0 auto',
      marginTop: '1rem',
      background: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
  },
  h1: {
    '&.MuiTypography-root': {
      fontSize: 40,
      color: theme.palette.secondary.main,
      fontWeight: '700',
    },
  },
  validationtext: {
    '&.MuiTypography-root': {
      fontSize: 15,
    },
  },
  gridMainText: {
    '&.MuiGrid-root': {
      flexBasis: '95%',
      maxWidth: '95%',
    },
  },
  gridFormStyle: {
    '&.MuiGrid-root': {
      backgroundColor: theme.palette.primary.white,
      color: theme.palette.primary.main,
    },
  },
  GridCenterReplacing: {
    '&.MuiGrid-root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '7rem',
    },
  },
  InputStyle: {
    '&.MuiFormControl-root': {
      height: '2.5rem',
    },
  },
  Links: {
    '&.MuiTypography-root': {
      textDecoration: 'none',
      fontSize: '1.3rem',
      color: theme.palette.secondary.main,
    },
  },
}))

const Registration: FC = () => {
  const { registrate } = useActions()
  const classes = useStyles()
  const { error, openSnack } = useTypeSelector((state) => state.user)

  const onSubmit: SubmitHandler<IRegistrateFormInputs> = (data) => {
    registrate(data)
  }

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IRegistrateFormInputs>({
    resolver: yupResolver(registrationScheme),
  })

  return (
    <Grid container justifyContent="center" height="100vh" className={classes.background}>
      <Grid
        container
        alignSelf="center"
        justifyContent="center"
        alignContent="center"
        borderRadius="1.5rem"
        width="40vw"
        height="60vh"
        minHeight="80vh"
        className={classes.gridFormStyle}
      >
        <Grid item xs={6} className={classes.GridCenterReplacing}>
          <Box
            component="img"
            sx={{
              height: 150,
              width: 150,
            }}
            alt="logo"
            src={logo}
          />
        </Grid>

        <Grid className={classes.GridCenterReplacing} item md={6}>
          <Typography textAlign="center" className={classes.h1} component="h1">
            Регистрация
          </Typography>
        </Grid>

        <Grid item md={8} justifyContent="center" className={classes.gridMainText}>
          <Grid container justifyContent="center">
            <Grid item xs={10}>
              {inputsForLoginRegistrate.map(({ label, inputName, type }, index) => (
                <Box key={`input ${index}`}>
                  <Controller
                    name={inputName}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label={label}
                        variant="filled"
                        size="small"
                        color="primary"
                        type={type}
                        margin="dense"
                        error={!!errors[inputName]}
                        fullWidth
                        helperText={errors[inputName] ? errors[inputName]?.message : null}
                        {...field}
                      />
                    )}
                  />
                </Box>
              ))}

              <Grid container>
                <Grid item xs={1} md={2}>
                  <Controller
                    name="checkBoxLicense"
                    control={control}
                    render={({ field }) => <Checkbox {...field} color="primary" />}
                  />
                </Grid>

                <Grid item xs={5} md={10} display="flex" alignItems="center">
                  <label>Лицензионное соглашение </label>
                </Grid>

                <Grid item xs={12}>
                  <Typography component="p" color="error" className={classes.validationtext}>
                    {errors.checkBoxLicense?.message}
                  </Typography>
                </Grid>
              </Grid>

              <Button
                className={classes.button}
                onClick={handleSubmit(onSubmit)}
                variant="contained"
              >
                Зарегистрироваться
              </Button>

              <Link className={classes.Links} href="/login" margin="dense">
                Страница авторизации
              </Link>
            </Grid>
          </Grid>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={openSnack}
            autoHideDuration={10}
            message={error}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Registration
