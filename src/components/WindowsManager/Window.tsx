import { ReactNode, useCallback, useRef } from 'react'
import Draggable from 'react-draggable'
import BaseWindow from '../Window'

export default function Window({
  title,
  content,
  uuid,
  x,
  y,
  minimized,
  maximized,
  active,
  onCloseWindow,
  onFocusWindow,
  ...rest
}: Omit<Parameters<typeof BaseWindow>[0], 'children'> & {
  uuid: string
  x: number
  y: number
  minimized: boolean
  maximized: boolean
  content: ReactNode
  onCloseWindow: (uuid: string) => void
  onFocusWindow: (uuid: string) => void
}) {
  const nodeRef = useRef<HTMLDivElement | null>(null)
  const handleCloseWindow = useCallback(
    () => onCloseWindow(uuid),
    [onCloseWindow, uuid]
  )
  const handleFocusWindow = useCallback(() => {
    if (!active) onFocusWindow(uuid)
  }, [onFocusWindow, uuid, active])
  return (
    <Draggable nodeRef={nodeRef} defaultPosition={{ x, y }}>
      <BaseWindow
        ref={nodeRef}
        {...rest}
        style={{
          ...rest.style,
          position: 'absolute',
          width: 'min-content',
          minWidth: '60%',
          pointerEvents: 'all',
        }}
        title={title}
        active={active}
        onClose={handleCloseWindow}
        onClick={handleFocusWindow}
      >
        {content}
      </BaseWindow>
    </Draggable>
  )
}
