import { Progress } from '@janhq/joi'
import { useAtomValue } from 'jotai'

import useDownloadModel from '@/hooks/useDownloadModel'
import { modelDownloadStateAtom } from '@/hooks/useDownloadState'

import { getDownloadingModelAtom } from '@/helpers/atoms/Model.atom'

const DownloadModelProgress = () => {
  const downloadStates = useAtomValue(modelDownloadStateAtom)
  const downloadingModels = useAtomValue(getDownloadingModelAtom)

  const { abortModelDownload } = useDownloadModel()

  const totalCurrentProgress = Object.values(downloadStates)
    .map((a) => a.size.transferred + a.size.transferred)
    .reduce((partialSum, a) => partialSum + a, 0)

  const totalSize = Object.values(downloadStates)
    .map((a) => a.size.total + a.size.total)
    .reduce((partialSum, a) => partialSum + a, 0)

  const totalPercentage = ((totalCurrentProgress / totalSize) * 100).toFixed(2)

  if (Object.values(downloadStates)?.length <= 0) return null

  return (
    <div className="flex items-center gap-x-2">
      <div className="cursor-pointer">
        {Object.values(downloadStates)?.length > 1
          ? `(Downloading model (1/${Object.values(downloadStates)?.length})`
          : `Downloading a model `}
      </div>
      <div className="w-28 inline-flex items-center gap-x-2">
        <Progress size="small" value={Number(totalPercentage)} />
        {String(totalPercentage)}%
      </div>
    </div>
  )
}

export default DownloadModelProgress
