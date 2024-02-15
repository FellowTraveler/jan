import { Badge } from '@janhq/joi'
import { MonitorIcon } from 'lucide-react'

import AppUpdateProgress from './AppUpdateProgress'

import DownloadModelProgress from './DownloadModelProgress'
import styles from './bottomBar.module.scss'

const BottomBar = () => {
  return (
    <div className={styles.bottomBar}>
      <div className="flex items-center gap-x-4">
        <AppUpdateProgress />
        <DownloadModelProgress />
      </div>
      <div className="flex gap-x-4 items-center">
        <Badge theme="secondary">
          <div className="flex items-center gap-x-2 cursor-pointer">
            <MonitorIcon size={14} className="mt-0.5" />
            <p>System Monitor</p>
          </div>
        </Badge>
        <div>
          <span className="text-xs text-muted-foreground">
            Jan v{VERSION ?? ''}
          </span>
        </div>
      </div>
    </div>
  )
}

export default BottomBar
