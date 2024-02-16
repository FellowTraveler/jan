import { useState } from 'react'

import {
  useClickOutside,
  ResizablePanelGroup,
  useHotkeys,
  ResizablePanel,
  ScrollArea,
  ResizableHandle,
} from '@janhq/joi'

import { useAtom } from 'jotai'

import styles from './systemMonitor.module.scss'

import { systemMonitortoggleAtom } from '@/helpers/atoms/SystemBar.atom'

type Props = {
  control: HTMLDivElement | null
}

const SystemMonitor = ({ control }: Props) => {
  const [systemMonitortoggle, setSystemMonitortoggle] = useAtom(
    systemMonitortoggleAtom
  )
  const [show, setShow] = useState<HTMLDivElement | null>(null)

  useClickOutside(() => setSystemMonitortoggle(false), null, [control, show])

  useHotkeys([
    [
      'escape',
      () => {
        if (systemMonitortoggle) {
          setSystemMonitortoggle(false)
        }
      },
    ],
  ])

  if (!systemMonitortoggle) return null

  return (
    <ResizablePanelGroup direction="vertical" className={styles.systemMonitor}>
      <div className={styles.wrapper}>
        <ResizablePanel>
          <div className={styles.emptyPanel} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div ref={setShow} className={styles.content}>
            <ScrollArea className="h-full">
              <div className="p-4">
                <h6 className="text-base font-semibold">Running Models</h6>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur molestiae dolores voluptatum qui consectetur
                  doloribus nobis libero eos, eum beatae. Repudiandae eos
                  aperiam at tenetur neque. Maiores aspernatur fugit dolores.
                </p>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
      </div>
    </ResizablePanelGroup>
  )
}

export default SystemMonitor
