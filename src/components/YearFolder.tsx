import { Folder } from '@react95/icons'
import styled from '@xstyled/styled-components'
import { useCallback } from 'react'

const CenteredDiv = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '0.25em',
  cursor: 'pointer',
})
export default function YearFolder({
  year,
  onClick,
}: {
  year: number
  onClick: (year: number) => void
}) {
  const handleClick = useCallback(() => onClick(year), [onClick, year])
  return (
    <CenteredDiv onClick={handleClick}>
      <Folder />
      <label>{year}</label>
    </CenteredDiv>
  )
}
