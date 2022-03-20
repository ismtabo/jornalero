import { AnyAction, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import {
  assign,
  last,
  map,
  matchesProperty,
  merge,
  remove,
  update,
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

export interface WindowsState {
  windows: ExtendedWindowProps[]
}

export const initialState: WindowsState = {
  windows: [],
}

type WindowsSlice = Slice<WindowsState>

const windowsSlice: WindowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    createWindow: (state, action: PayloadAction<WindowProps>) => ({
      windows: state.windows.concat({
        ...action.payload,
        uuid: `${state.windows.length}`,
        minimized: false,
        maximized: false,
        createdAt: new Date(),
      }),
    }),
    closeWindow: (state, action: PayloadAction<string>) =>
      void remove(state.windows, matchesProperty('uuid', action.payload)),
    focusWindow: (state, action: PayloadAction<string>) => ({
      windows: map(state.windows, (window) =>
        merge(window, {
          active: matchesProperty('uuid', action.payload)(window),
        })
      ),
    }),
  },
})

export const windowsReducer = windowsSlice.reducer
export const { createWindow, closeWindow, focusWindow } = windowsSlice.actions
export const openWindow =
  (window: WindowProps): Thunk<WindowsState, AnyAction> =>
  (dispatch, getState) => {
    dispatch(createWindow(window))
    dispatch(focusWindow(last(getState().windows)!.uuid))
  }
