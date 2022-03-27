import { Frame, TitleBar } from '@react95/core'
import {
  forwardRef,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  useCallback,
} from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  content: {
    height: '100%',
    display: 'grid',
    padding: '10px 10px 10px',
    gridTemplateColumns: '1fr 4fr 1fr',
    justifyItems: 'center',
    gap: '1em',
  },
})

export default forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    title: string
    children: ReactNode
    active?: boolean
    onClose?: () => void
  }
>(({ title, children, onClose, active = true, ...rest }, ref) => {
  const classes = useStyles()
  const handleClose: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation()
      onClose?.()
    },
    [onClose]
  )
  return (
    <Frame ref={ref} draggable padding="0.2em" {...rest}>
      <TitleBar title={title} active={active}>
        <TitleBar.OptionsBox>
          <TitleBar.Option>?</TitleBar.Option>
          <TitleBar.Option onClick={handleClose}>X</TitleBar.Option>
        </TitleBar.OptionsBox>
      </TitleBar>
      <div className={classes.content}>{children}</div>
    </Frame>
  )
})
