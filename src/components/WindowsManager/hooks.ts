import { useContext } from 'react'
import { WindowsContext } from './context'

const useWindowContext = () => useContext(WindowsContext)

export const useOpenWindow = () => useWindowContext().openWindow
