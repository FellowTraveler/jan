import { Progress } from '@janhq/joi'
import { useAtomValue } from 'jotai'

import { appDownloadProgressAtom } from '@/helpers/atoms/AppDownload.atom'

const AppUpdateProgress = () => {
  const appDownloadProgress = useAtomValue(appDownloadProgressAtom)

  if (appDownloadProgress < 0) return null

  return (
    <div className="flex items-center gap-x-2">
      Updating App
      <div className="w-28 inline-flex items-center gap-x-2">
        <Progress size="small" value={50} />
        50%
      </div>
    </div>
  )
}

export default AppUpdateProgress
