import { useState } from 'react'

import { useClickOutside, getHotkeyHandler } from '@janhq/joi'

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

  // useHotkeys([['escape', () => setSystemMonitortoggle(false)]])

  if (!systemMonitortoggle) return null

  return (
    <div
      ref={setShow}
      className={styles.systemMonitor}
      onKeyUp={() => console.log('adada')}
      onKeyDown={getHotkeyHandler([['escape', () => console.log('haha')]])}
    >
      <h6 className="text-base font-semibold">Running Models</h6>
      <p className="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        molestiae dolores voluptatum qui consectetur doloribus nobis libero eos,
        eum beatae. Repudiandae eos aperiam at tenetur neque. Maiores aspernatur
        fugit dolores.
      </p>
    </div>
  )
}

export default SystemMonitor
