import React, { useCallback, useState } from 'react'

import { Check, Pencil } from 'lucide-react'

type Props = {
  onEditModelClick: () => void
}

const ImportSuccessIcon: React.FC<Props> = ({ onEditModelClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  const onMouseOver = () => {
    setIsHovered(true)
  }

  const onMouseOut = () => {
    setIsHovered(false)
  }

  return (
    <div onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      {isHovered ? (
        <EditIcon onEditModelClick={onEditModelClick} />
      ) : (
        <SuccessIcon />
      )}
    </div>
  )
}

const SuccessIcon: React.FC = React.memo(() => (
  <div className="flex w-8 h-8 rounded-full bg-primary items-center justify-center">
    <Check color="#FFF" />
  </div>
))

const EditIcon: React.FC<Props> = React.memo(({ onEditModelClick }) => {
  const onClick = useCallback(() => {
    onEditModelClick()
  }, [onEditModelClick])

  return (
    <div
      className="flex w-8 h-8 rounded-lg bg-gray-100 items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <Pencil />
    </div>
  )
})

export default ImportSuccessIcon
