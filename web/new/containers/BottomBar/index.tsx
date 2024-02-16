import { Fragment, useState } from 'react'

import { Badge } from '@janhq/joi'
import { useAtom } from 'jotai'
import { MonitorIcon } from 'lucide-react'

import AppUpdateProgress from './AppUpdateProgress'
import DownloadModelProgress from './DownloadModelProgress'
import SystemMonitor from './SystemMonitor'

import styles from './bottomBar.module.scss'

import { systemMonitortoggleAtom } from '@/helpers/atoms/SystemBar.atom'

const BottomBar = () => {
  const [systemMonitortoggle, setSystemMonitortoggle] = useAtom(
    systemMonitortoggleAtom
  )
  const [control, setControl] = useState<HTMLDivElement | null>(null)

  return (
    <Fragment>
      <div className={styles.bottomBar}>
        <div className="flex items-center gap-x-4">
          <AppUpdateProgress />
          <DownloadModelProgress />
        </div>
        <div className="flex gap-x-4 items-center">
          <Badge theme={systemMonitortoggle ? 'secondary' : 'ghost'}>
            <div
              className="flex items-center gap-x-2 cursor-pointer"
              onClick={() => setSystemMonitortoggle(!systemMonitortoggle)}
              ref={setControl}
            >
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
      <SystemMonitor control={control} />
    </Fragment>
  )
}

export default BottomBar
