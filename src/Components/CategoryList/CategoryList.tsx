import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useActions, useTypeSelector } from '../../hooks'

const useStyles = makeStyles({
  button: {
    '&.MuiButton-root': {
      background: 'white',
      display: 'flex',
      width: '70%',
      margin: '0 auto',
      marginTop: '1rem',
    },
  },
  links: {
    '&.MuiTypography-root': {
      fontSize: 20,
      textDecoration: 'none',
    },
  },
  title: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
      fontSize: 30,
      marginBottom: '3rem',
    },
  },
})

const CategoryList: FC = () => {
  const { getAllCategories } = useActions()
  const { categories } = useTypeSelector((state) => state.categories)
  const classes = useStyles()

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <Grid container alignContent="space-between">
      <Grid item xl={12} md={12} lg={12}>
        <Typography className={classes.title}>Категории</Typography>
      </Grid>

      <Grid item lg={12}>
        <Grid container height="50vh">
          {categories
            ?.filter((categories) => categories.shown)
            .map((category, index) => (
              <Grid item xl={12} md={12} lg={12} key={index}>
                <Link to={category.title}>
                  <Typography className={classes.links}>{category.title}</Typography>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CategoryList
