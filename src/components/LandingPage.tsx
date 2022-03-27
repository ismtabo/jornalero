import { TaskBar } from '@react95/core'
import { useCallback } from 'react'
import { createUseStyles } from 'react-jss'
import { useOpenWindow } from './WindowsManager/hooks'
import YearFolder from './YearFolder'

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    padding: '1em',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '1em',
    userSelect: 'none',
  },
})

const Desktop = () => {
  const classes = useStyles()
  const openWindow = useOpenWindow()
  const years = new Array(1)
    .fill(null)
    .map((_, i) => 2022 - i)
    .reverse()
  const handleClick = useCallback(
    (year: number) => {
      openWindow({
        title: `${year}`,
        content: <>Este es el contenido de un año</>,
      })
    },
    [openWindow]
  )
  return (
    <div className={classes.container}>
      {years.map((year, i) => (
        <YearFolder key={i} year={year} onClick={() => handleClick(year)} />
      ))}
    </div>
  )
}

export default function LandingPage() {
  return (
    <>
      <TaskBar />
      <Desktop />
    </>
  )
}
