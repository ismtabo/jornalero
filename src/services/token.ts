import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Token {
  access_token: string
  expires_at: Date
  expires_in: number
  first_issued_at: Date
  id_token: string
  idpId: string
  login_hint: string
  scope: string
  session_state: {
    extraQueryParams: {
      authUser: string
    }
  }
  token_type: string
}

type TokenState = Token | null

const tokenSlice = createSlice({
  name: 'token',
  initialState: null as TokenState,
  reducers: {
    setToken(_, { payload }: PayloadAction<Token>) {
      return payload
    },
    removeToken(_) {
      return null
    },
  },
})

export const tokenReducer = tokenSlice.reducer
export const { setToken, removeToken } = tokenSlice.actions
