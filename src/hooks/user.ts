import { useDispatch, useSelector, useStore } from 'react-redux'
import { selectUser } from '../services'
import { removeUser, setUser, User } from '../services/user'

export const useUser = () => useSelector(selectUser)

export const useSetUser = () => {
  const dispatch = useDispatch()
  return (user: User) => dispatch(setUser(user))
}

export const useRemoveUser = () => {
  const dispatch = useDispatch()
  return () => dispatch(removeUser())
}
