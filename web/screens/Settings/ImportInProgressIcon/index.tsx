import React, { useCallback, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'

import { X } from 'lucide-react'

type Props = {
  onDeleteModelClick: () => void
}

const ImportInProgressIcon: React.FC<Props> = ({ onDeleteModelClick }) => {
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
        <DeleteIcon onDeleteModelClick={onDeleteModelClick} />
      ) : (
        <ProgressIcon />
      )}
    </div>
  )
}

const ProgressIcon: React.FC = React.memo(() => (
  <div className="w-8 h-8 rounded-full">
    <CircularProgressbar value={66} />
  </div>
))

const DeleteIcon: React.FC<Props> = React.memo(({ onDeleteModelClick }) => {
  const onClick = useCallback(() => {
    onDeleteModelClick()
  }, [onDeleteModelClick])

  return (
    <div
      className="flex w-8 h-8 rounded-lg bg-gray-100 items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <X />
    </div>
  )
})

export default ImportInProgressIcon
