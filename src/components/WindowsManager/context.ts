import { noop } from 'lodash'
import { createContext } from 'react'

export const WindowsContext = createContext({
  openWindow: noop,
})
