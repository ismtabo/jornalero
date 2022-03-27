import { ReactNode, useCallback } from 'react'
import useThunkReducer from 'react-hook-thunk-reducer'
import { createUseStyles } from 'react-jss'
import useWindowSize from '../../hooks/useWindoSize'
import { WindowsContext } from './context'
import {
  closeWindow,
  focusWindow,
  initialState,
  openWindow,
  WindowProps,
  windowsReducer,
} from './slice'
import Window from './Window'

const useStyles = createUseStyles({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    pointerEvents: 'none',
  },
})

export default function WindowsManager({ children }: { children: ReactNode }) {
  const { height = 0, width = 0 } = useWindowSize()
  const [state, dispatch] = useThunkReducer(windowsReducer, initialState)
  const classes = useStyles()
  const handleOpenWindow = useCallback(
    (window: WindowProps) =>
      dispatch(
        openWindow({
          ...window,
          x: width / 2,
          y: height / 2,
        })
      ),
    [dispatch, width, height]
  )
  const handleCloseWindow = useCallback(
    (uuid: string) => dispatch(closeWindow(uuid)),
    [dispatch]
  )
  const handleFocusWindow = useCallback(
    (uuid: string) => dispatch(focusWindow(uuid)),
    [dispatch]
  )
  return (
    <WindowsContext.Provider
      value={{
        openWindow: handleOpenWindow,
      }}
    >
      {children}
      <div className={classes.container}>
        {state.map((window) => (
          <Window
            key={window.uuid}
            {...window}
            onCloseWindow={handleCloseWindow}
            onFocusWindow={handleFocusWindow}
          />
        ))}
      </div>
    </WindowsContext.Provider>
  )
}
