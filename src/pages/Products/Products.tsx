import { FC } from 'react'
import { Grid } from '@mui/material'
import { ProductList } from '../../Components'

const Products: FC = () => {
  return (
    <Grid container alignItems="center">
      <ProductList />
    </Grid>
  )
}

export default Products
