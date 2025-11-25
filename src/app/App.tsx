import React, {useEffect} from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import './app.module.css'
import AppHeader from "../components/header/AppHeader/AppHeader"
import {Provider} from "react-redux"
import {store} from "../store"
import {cleanIngredients, fetchIngredients} from "../store/actions/ingredients"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/AuthPages/LoginPage"
import RegisterPage from "../pages/AuthPages/RegisterPage"
import ForgotPasswordPage from "../pages/AuthPages/ForgotPasswordPage"
import ResetPasswordPage from "../pages/AuthPages/ResetPasswordPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import ProfileContent from "../pages/ProfilePage/ProfileContent"
import ProfileOrders from "../pages/ProfilePage/ProfileOrders"
import IngredientPage from "../pages/IngredientPage"
import NotFoundPage from "../pages/ErrorPages/NotFoundPage"
import ProtectedRoute from "../components/ProtectedRoute"
import Modal from "../components/modals/Modal/Modal"
import IngredientDetails from "../components/modals/IngredientDetails/IngredientDetails"
import { useSelector } from "react-redux"
import { RootState } from "../store"


function AppContent() {
    const location = useLocation()
    const navigate = useNavigate()
    const ingredients = useSelector((state: RootState) => state.ingredients.items.ingredients)
    
    const background = location.state?.background
    const ingredientId = location.pathname.match(/\/ingredients\/(.+)/)?.[1]
    const ingredient = ingredientId ? ingredients.find(item => item._id === ingredientId) : null
    
    const handleCloseModal = () => {
        navigate(background || '/')
    }

    return (
        <>
            <AppHeader/>
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<ProtectedRoute requireAuth={false}><LoginPage /></ProtectedRoute>} />
                <Route path="/register" element={<ProtectedRoute requireAuth={false}><RegisterPage /></ProtectedRoute>} />
                <Route path="/forgot-password" element={<ProtectedRoute requireAuth={false}><ForgotPasswordPage /></ProtectedRoute>} />
                <Route path="/reset-password" element={<ProtectedRoute requireAuth={false}><ResetPasswordPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}>
                    <Route index element={<ProfileContent />} />
                    <Route path="orders" element={<ProfileOrders />} />
                </Route>
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
        </>
    )
}

function App() {
    useEffect(() => {
        store.dispatch(fetchIngredients() as any)

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
