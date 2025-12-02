import React, { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../store"
import { getUser } from "../store/actions/user"
import { getRefreshToken } from "../helpers/utils/tokenHelper"

interface ProtectedRouteProps {
  children: React.ReactElement
  requireAuth?: boolean
  redirectTo?: string
}

function ProtectedRoute({
  children,
  requireAuth = true,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { isAuthenticated, user, loading } = useAppSelector(
    (state) => state.user
  )
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      if (requireAuth) {
        const refreshToken = getRefreshToken()
        if (refreshToken && !isAuthenticated && !user) {
          try {
            await dispatch(getUser())
          } catch (error) {
            console.error("Ошибка", error)
          }
        }
      }
      setIsChecking(false)
    }
    checkAuth()
  }, [dispatch, requireAuth, isAuthenticated, user])

  if (isChecking || (requireAuth && loading && !user)) {
    return <div>Загрузка...</div>
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
