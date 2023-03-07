import { FC } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { makeStyles } from '@mui/styles'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField, Button, Typography, Grid, Box, Snackbar, Link, Theme } from '@mui/material'
import { useActions, useTypeSelector } from '../../hooks'
import { authorizationScheme } from '../../helpers/validator'
import { inputsForLogin } from '../../constants'
import type { ILoginFormInputs } from './interface'
import { logo } from '../../img'

const useStyles = makeStyles((theme: Theme) => ({
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
      color: theme.palette.secondary.main,
    },
  },

  Links: {
    '&.MuiTypography-root': {
      textDecoration: 'none',
      fontSize: '1.3rem',
      color: theme.palette.secondary.main,
    },
  },

  gridFormStyle: {
    '&.MuiGrid-root': {
      backgroundColor: theme.palette.primary.white,
      color: theme.palette.secondary.main,
    },
  },
}))

const Authorization: FC = () => {
  const { login } = useActions()
  const classes = useStyles()
  const { error, openSnack } = useTypeSelector((state) => state.user)

  const onSubmit: SubmitHandler<ILoginFormInputs> = (data) => {
    login(data.email, data.password)
  }

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(authorizationScheme),
  })

  return (
    <Grid className={classes.background} container justifyContent="center" height="100vh">
      <Grid
        container
        alignSelf="center"
        justifyContent="center"
        borderRadius="1.5rem"
        width="40vw"
        height="40vh"
        minHeight="40vh"
        className={classes.gridFormStyle}
      >
        <Grid item md={12}>
          <Typography textAlign="center" className={classes.h1} component="h1">
            Авторизация
          </Typography>
        </Grid>

        <Grid item md={8} justifyContent="center" className={classes.gridMainText}>
          <Grid container justifyContent="center">
            <Grid item xs={5} alignItems="center">
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

            <Grid item xs={6}>
              {inputsForLogin.map(({ label, inputName, type }, index) => (
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
                        error={!!errors[inputName]}
                        margin="dense"
                        fullWidth
                        helperText={errors[inputName] ? errors[inputName]?.message : null}
                        {...field}
                      />
                    )}
                  />
                </Box>
              ))}

              <Button
                className={classes.button}
                onClick={handleSubmit(onSubmit)}
                variant="contained"
              >
                Войти
              </Button>

              <Grid item xl={12}>
                <Grid container gap={1} margin="1rem" display="flex" justifyContent="flex-end">
                  <Grid item xl={12}>
                    <Link className={classes.Links} href="/signup" margin="dense">
                      Зарегистрироваться
                    </Link>
                  </Grid>

                  <Grid item xl={12}>
                    <Link className={classes.Links} href="/forgot" margin="dense">
                      Забыли пароль?
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
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
export default Authorization
