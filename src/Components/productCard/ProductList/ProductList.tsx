import { FC, useEffect, useState } from 'react'
import { Grid, Pagination, Theme, Modal } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useActions, useTypeSelector } from '../../../hooks'
import { Preloader, ProductItem, ModalProductItem } from '../..'
import type { IProductsDate } from '../../../models/redux'

export const useStyles = makeStyles((theme: Theme) => ({
  cardFormStyle: {
    '&.MuiCard-root': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
    '&.MuiPaper-root': {
      width: '250px',
      mr: 10,
      mb: 2,
    },
  },
  gridFormStyle: {
    '&.MuiGrid-root': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
  },
  productName: {
    '&.MuiGrid-root': {
      flexBasis: '95%',
      maxWidth: '95%',
    },
  },
  productCost: {
    '&.MuiTypography-root': {
      fontSize: 14,
    },
  },
}))

const ProductCard: FC = () => {
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [choosedProduct, setChoosedProduct] = useState<IProductsDate>()
  const { products } = useTypeSelector((state) => state.products)
  const { getPartOfProducts } = useActions()
  const classes = useStyles()
  const { isLoading } = useTypeSelector((state) => state.products)

  useEffect(() => {
    getPartOfProducts(page)
  }, [page])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleClickOpen = (product: IProductsDate) => {
    setChoosedProduct(product)
    setOpen(true)
  }

  const handleClickClose = () => setOpen(false)

  if (isLoading) {
    return <Preloader />
  }

  return (
    <Grid container flexDirection="column" alignItems="center" justifyContent="center">
      <Grid container alignItems="center" justifyContent="center">
        {products?.map((product) => (
          <ProductItem
            key={product.id}
            product={product as unknown as IProductsDate}
            openSnack={handleClickOpen}
          />
        ))}

        {choosedProduct && (
          <Modal open={open} onClose={handleClickClose} className={classes.gridFormStyle}>
            <ModalProductItem product={choosedProduct} />
          </Modal>
        )}
      </Grid>

      <Grid item alignItems="center" justifyContent="center" mt={5}>
        <Pagination
          showFirstButton
          showLastButton
          count={3}
          page={page}
          onChange={handleChangePage}
        />
      </Grid>
    </Grid>
  )
}

export default ProductCard
