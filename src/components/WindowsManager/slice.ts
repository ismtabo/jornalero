import { AnyAction, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import {
  assign,
  concat,
  filter,
  last,
  map,
  matchesProperty,
  negate,
} from 'lodash'
import { ReactNode } from 'react'
import { Thunk } from 'react-hook-thunk-reducer'

export interface WindowProps {
  title: string
  content: ReactNode
  x: number
  y: number
}

export interface ExtendedWindowProps extends WindowProps {
  uuid: string
  active?: boolean
  minimized: boolean
  maximized: boolean
  createdAt: Date
}

export type WindowsState = ExtendedWindowProps[]

export const initialState: WindowsState = []

type WindowsSlice = Slice<WindowsState>

const windowsSlice: WindowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    createWindow: (state, action: PayloadAction<WindowProps>) =>
      concat(state, {
        ...action.payload,
        uuid: `${state.length}`,
        minimized: false,
        maximized: false,
        createdAt: new Date(),
      }),
    closeWindow: (state, action: PayloadAction<string>) =>
      filter(state, negate(matchesProperty('uuid', action.payload))),
    focusWindow: (state, action: PayloadAction<string>) =>
      map(state, (window) =>
        assign({}, window, {
          active: matchesProperty('uuid', action.payload)(window),
        })
      ),
  },
})

export const windowsReducer = windowsSlice.reducer
export const { createWindow, closeWindow, focusWindow } = windowsSlice.actions
export const openWindow =
  (window: WindowProps): Thunk<WindowsState, AnyAction> =>
  (dispatch, getState) => {
    dispatch(createWindow(window))
    dispatch(focusWindow(last(getState())!.uuid))
  }
