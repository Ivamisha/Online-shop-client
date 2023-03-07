import { FC, useState } from 'react'
import { styled } from '@mui/material/styles'
import { InputBase, Grid } from '@mui/material'
import { useActions } from '../../hooks'
import SearchIcon from '@mui/icons-material/Search'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'white',
  marginRight: theme.spacing(1),
  width: '100%',
  border: '2px solid black',
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  color: 'black',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}))

const SearchComponent: FC = () => {
  const [page, setPage] = useState(1)
  const { findProduct, getPartOfProducts } = useActions()

  const findProductByName = (product: string) => {
    product.length > 2 ? findProduct(product) : getPartOfProducts(page)
  }

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <StyledInputBase placeholder="Поиск" onChange={(e) => findProductByName(e.target.value)} />
      </Search>
    </Grid>
  )
}

export default SearchComponent
