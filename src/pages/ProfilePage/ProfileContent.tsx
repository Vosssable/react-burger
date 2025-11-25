import { useState, useEffect, FormEvent } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { RootState } from "../../store"
import { updateUser, getUser } from "../../store/actions/user"

function ProfileContent() {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state: RootState) => state.user)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!user) {
      dispatch(getUser() as any)
    } else {
      setName(user.name)
      setEmail(user.email)
    }
  }, [dispatch, user])

  const handleCancel = () => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
    setPassword("")
    setIsEditing(false)
    setError(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(false)

    try {
      const updateData: any = {}
      if (name !== user?.name) updateData.name = name
      if (email !== user?.email) updateData.email = email
      if (password) updateData.password = password

      if (Object.keys(updateData).length > 0) {
        await dispatch(updateUser(updateData) as any)
        setPassword("")
        setIsEditing(false)
        setError(false)
      }
    } catch (err: any) {
      console.error("Ошибка: ", err)
      setError(true)
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  if (loading && !user) {
    return <div>Идёт загрузка профиля...</div>
  }

  return (
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            disabled={!isEditing}
            icon={isEditing ? "CloseIcon" : "EditIcon"}
            onIconClick={isEditing ? handleCancel : handleEdit}
            size="default"
            error={error}
            errorText="Что-то пошло не так..."
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <div className="mb-6">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            disabled={!isEditing}
            error={error}
            icon={isEditing ? "CloseIcon" : "EditIcon"}
            onIconClick={isEditing ? handleCancel : handleEdit}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            size="default"
          />
        </div>
        <div className="mb-6">
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            disabled={!isEditing}
            icon={isEditing ? "CloseIcon" : "EditIcon"}
            onIconClick={isEditing ? handleCancel : handleEdit}
            error={error}
            size="default"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        {isEditing && (
          <div className="mb-6">
            <Button
              type="secondary"
              size="medium"
              htmlType="button"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Отмена
            </Button>
            <Button
              type="primary"
              size="medium"
              htmlType="submit"
              disabled={isSaving}
              style={{ marginLeft: "1rem" }}
            >
              {isSaving ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        )}
      </form>
  )
}

export default ProfileContent
