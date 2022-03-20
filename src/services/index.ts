import {
  AnyAction,
  combineReducers,
  Dispatch,
  ThunkAction,
} from '@reduxjs/toolkit'
import { ReducerState } from 'react'
import { setToken, Token, tokenReducer } from './token'
import { setUser, User, userReducer } from './user'

export const reducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
})

export type RootState = ReturnType<typeof reducer>

export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>

export const setAuth =
  (user: User, token: Token): AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(setUser(user))
    dispatch(setToken(token))
  }
export const selectUser = (state: ReducerState<typeof reducer>) => state.user
export const selectToken = (state: ReducerState<typeof reducer>) => state.token
