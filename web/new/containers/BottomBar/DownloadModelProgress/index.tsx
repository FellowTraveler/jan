import { Progress } from '@janhq/joi'
import { useAtomValue } from 'jotai'

import { modelDownloadStateAtom } from '@/hooks/useDownloadState'

const DownloadModelProgress = () => {
  const downloadStates = useAtomValue(modelDownloadStateAtom)

  const totalCurrentProgress = Object.values(downloadStates)
    .map((a) => a.size.transferred + a.size.transferred)
    .reduce((partialSum, a) => partialSum + a, 0)

  const totalSize = Object.values(downloadStates)
    .map((a) => a.size.total + a.size.total)
    .reduce((partialSum, a) => partialSum + a, 0)

  const totalPercentage =
    totalSize !== 0 ? ((totalCurrentProgress / totalSize) * 100).toFixed(2) : 0

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
