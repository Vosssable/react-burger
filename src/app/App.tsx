import React, {useEffect} from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import './app.module.css'
import AppHeader from "../components/header/AppHeader/AppHeader"
import {Provider} from "react-redux"
import {store} from "../store"
import {cleanIngredients, fetchIngredients} from "../store/actions/ingredients"
import HomePage from "../pages/HomePage"
import FeedPage from "../pages/FeedPage"
import LoginPage from "../pages/AuthPages/LoginPage"
import RegisterPage from "../pages/AuthPages/RegisterPage"
import ForgotPasswordPage from "../pages/AuthPages/ForgotPasswordPage"
import ResetPasswordPage from "../pages/AuthPages/ResetPasswordPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import ProfileContent from "../pages/ProfilePage/ProfileContent"
import ProfileOrders from "../pages/ProfilePage/ProfileOrders"
import FeedOrderPage from "../pages/FeedOrderPage"
import ProfileOrderPage from "../pages/ProfileOrderPage"
import IngredientPage from "../pages/IngredientPage"
import NotFoundPage from "../pages/ErrorPages/NotFoundPage"
import ProtectedRoute from "../components/ProtectedRoute"
import Modal from "../components/modals/Modal/Modal"
import IngredientDetails from "../components/modals/IngredientDetails/IngredientDetails"
import OrderInfo from "../components/orders/OrderInfo/OrderInfo"
import { useAppSelector } from "../store"
import { IOrder } from "../store/middleware/socketMiddleware"


function AppContent() {
    const location = useLocation()
    const navigate = useNavigate()
    const ingredients = useAppSelector((state) => state.ingredients.items.ingredients)
    const feedOrders = useAppSelector((state) => state.wsFeed.orders)
    const profileOrders = useAppSelector((state) => state.wsProfileOrders.orders)
    
    const background = location.state?.background
    const ingredientId = location.pathname.match(/\/ingredients\/(.+)/)?.[1]
    const feedOrderId = location.pathname.match(/\/feed\/(.+)/)?.[1]
    const profileOrderId = location.pathname.match(/\/profile\/orders\/(.+)/)?.[1]
    
    const ingredient = ingredientId ? ingredients.find(item => item._id === ingredientId) : null
    const feedOrder = feedOrderId ? feedOrders.find((o: IOrder) => o._id === feedOrderId || o.number.toString() === feedOrderId || o.number === Number(feedOrderId)) : null
    const profileOrder = profileOrderId ? profileOrders.find((o: IOrder) => o._id === profileOrderId || o.number.toString() === profileOrderId || o.number === Number(profileOrderId)) : null
    
    const handleCloseModal = () => {
        navigate(background || '/')
    }

    return (
        <>
            <AppHeader/>
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/feed" element={<FeedPage />} />
                {!background && <Route path="/feed/:id" element={<FeedOrderPage />} />}
                <Route path="/login" element={<ProtectedRoute requireAuth={false}><LoginPage /></ProtectedRoute>} />
                <Route path="/register" element={<ProtectedRoute requireAuth={false}><RegisterPage /></ProtectedRoute>} />
                <Route path="/forgot-password" element={<ProtectedRoute requireAuth={false}><ForgotPasswordPage /></ProtectedRoute>} />
                <Route path="/reset-password" element={<ProtectedRoute requireAuth={false}><ResetPasswordPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}>
                    <Route index element={<ProfileContent />} />
                    <Route path="orders" element={<ProfileOrders />} />
                </Route>
                {!background && <Route path="/profile/orders/:id" element={<ProtectedRoute><ProfileOrderPage /></ProtectedRoute>} />}
                {!background && <Route path="/ingredients/:id" element={<IngredientPage />} />}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            
            {background && ingredient && (
                <Routes>
                    <Route
                        path="/ingredients/:id"
                        element={
                            <Modal isOpen={true} onClose={handleCloseModal} title="Детали ингредиента">
                                <IngredientDetails info={ingredient} />
                            </Modal>
                        }
                    />
                </Routes>
            )}

            {background && feedOrder && (
                <Routes>
                    <Route
                        path="/feed/:id"
                        element={
                            <Modal isOpen={true} onClose={handleCloseModal} title={null} showClose={false}>
                                <OrderInfo order={feedOrder} ingredients={ingredients} />
                            </Modal>
                        }
                    />
                </Routes>
            )}

            {background && profileOrder && (
                <Routes>
                    <Route
                        path="/profile/orders/:id"
                        element={
                            <Modal isOpen={true} onClose={handleCloseModal} title={null} showClose={false}>
                                <OrderInfo order={profileOrder} ingredients={ingredients} />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    )
}

function App() {
    useEffect(() => {
        store.dispatch(fetchIngredients())

        return () => {
            store.dispatch(cleanIngredients())
        }
    }, [])

    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    )
}

export default App
