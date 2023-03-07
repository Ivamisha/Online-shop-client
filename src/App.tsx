import { FC, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Preloader, Layout, EditProfile } from './Components'
import {
  Authorization,
  Registration,
  Forgot,
  Restore,
  Products,
  Profile,
  Main,
  ShoppingCart,
  UserPage,
  Favorite,
} from './pages'
import { useActions, useTypeSelector } from './hooks'

const App: FC = () => {
  const { isAuth, isLoading } = useTypeSelector((state) => state.user)
  const { checkAuth } = useActions()

  useEffect(() => {
    checkAuth()
  }, [])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      {isAuth ? (
        <Routes>
          <Route path="*" element={<Main />}>
            <Route path="categories" element={<Layout />} />
            <Route path="products" element={<Products />} />
            <Route path="statistics" element={<Layout />} />
          </Route>
          <Route path="profile" element={<Profile />}>
            <Route index element={<UserPage />} />
            <Route path="user" element={<UserPage />} />
            <Route path="cart" element={<ShoppingCart />} />
            <Route path="edit" element={<EditProfile />} />
            <Route path="favorite" element={<Favorite />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Main />}>
            <Route path="categories" element={<Layout />} />
            <Route path="products" element={<Products />} />
            <Route path="statistics" element={<Layout />} />
          </Route>
          <Route path="profile" element={<Profile />}>
            <Route index element={<Favorite />} />
            <Route path="favorite" element={<Favorite />} />
          </Route>
          <Route path="login" element={<Authorization />} />
          <Route path="signUp" element={<Registration />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="restore" element={<Restore />} />
        </Routes>
      )}
    </>
  )
}

export default App
