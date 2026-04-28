import { StrictMode, Suspense, lazy } from 'react'
import './styles/theme.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import "./components/molecules/ProductCard"
import Layout from "./components/templates/Layout"

const Gallery = lazy(() => import('./components/organisms/gallery/Gallery'))
const Login = lazy(() => import('./components/organisms/login/Login'))
const Register = lazy(() => import('./components/organisms/register/Register'))
const Profile = lazy(() => import('./components/organisms/profile/Profile'))
const ProductDetail = lazy(() => import('./components/organisms/productDetail/ProductDetail'))
const Cart = lazy(() => import('./components/organisms/cart/Cart'))
const CheckoutPreview = lazy(() => import('./components/organisms/checkout/CheckoutPreview'))
const ThemeSettings = lazy(() => import('./components/organisms/theme/ThemeSettings'))

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Suspense fallback={<div className="flex h-64 items-center justify-center"><div className="h-12 w-12 animate-spin rounded-full border-b-2 border-slate-900"></div></div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/gallery" replace />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="cart" element={<Cart />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="checkout" element={<CheckoutPreview />} />
              <Route path="theme" element={<ThemeSettings />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </StrictMode>
  )
}

export default App

createRoot(document.getElementById('root')).render(<App />)
