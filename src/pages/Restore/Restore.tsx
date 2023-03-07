import { FC } from 'react'
import { TextField, Button, Typography, Grid, Box, Snackbar, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useActions, useTypeSelector } from '../../hooks'
import { IRestoreFormInputs } from './interface'
import { logo } from '../../img/index'
import { inputsForRestore } from '../../constants'
import { restoreScheme } from '../../helpers/validator'

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    '&.MuiGrid-root': {
      background: theme.palette.primary.blue,
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
      color: theme.palette.primary.main,
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

const Restore: FC = () => {
  const { restore } = useActions()
  const classes = useStyles()
  const { error, openSnack } = useTypeSelector((state) => state.user)

  const onSubmit: SubmitHandler<IRestoreFormInputs> = (data) => {
    restore(data.password, data.activationLink)
  }

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IRestoreFormInputs>({
    resolver: yupResolver(restoreScheme),
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
            Сменить пароль
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
              {inputsForRestore.map(({ label, inputName, type }, index) => (
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
                Сменить
              </Button>
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
export default Restore
