import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  email: string
  familyName: string
  givenName: string
  googleId: string
  imageUrl: string
  name: string
}

type UserState = User | null

const userSlice = createSlice({
  name: 'user',
  initialState: null as UserState,
  reducers: {
    setUser: (_, { payload }: PayloadAction<User>) => {
      return payload
    },
    removeUser: (_) => {
      return null
    },
  },
})

export const userReducer = userSlice.reducer
export const { setUser, removeUser } = userSlice.actions
