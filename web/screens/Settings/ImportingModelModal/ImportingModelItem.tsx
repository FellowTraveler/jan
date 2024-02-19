import { useSetAtom } from 'jotai'

import { setImportModelStageAtom } from '@/hooks/useImportModel'

import { toGibibytes } from '@/utils/converter'

import { editingModelIdAtom } from '../EditModelInfoModal'
import ImportInProgressIcon from '../ImportInProgressIcon'
import ImportSuccessIcon from '../ImportSuccessIcon'

type Props = {
  id: string
  name: string
  size: number
  isFinished: boolean
}

const ImportingModelItem: React.FC<Props> = ({
  id,
  name,
  size,
  isFinished,
}) => {
  const setImportModelStage = useSetAtom(setImportModelStageAtom)
  const setEditingModelId = useSetAtom(editingModelIdAtom)
  const sizeInGb = toGibibytes(size)

  const onEditModelInfoClick = () => {
    setEditingModelId(id)
    setImportModelStage('EDIT_MODEL_INFO')
  }

  const onDeleteModelClick = () => {}

  return (
    <div className="flex flex-row w-full px-4 py-3 border rounded-lg space-x-3 items-center">
      <p className="flex-1 line-clamp-1">{name}</p>
      <p>{sizeInGb}</p>

      {isFinished ? (
        <ImportSuccessIcon onEditModelClick={onEditModelInfoClick} />
      ) : (
        <ImportInProgressIcon onDeleteModelClick={onDeleteModelClick} />
      )}
    </div>
  )
}

export default ImportingModelItem
