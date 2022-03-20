import { useDispatch } from 'react-redux'
import { setAuth } from '../services'
import { Token } from '../services/token'
import { User } from '../services/user'

export const useSetAuth = () => (user: User, token: Token) =>
  useDispatch()(setAuth(user, token))
