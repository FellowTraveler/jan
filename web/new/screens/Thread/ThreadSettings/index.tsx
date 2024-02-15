/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import {
  ResizablePanel,
  ScrollArea,
  ScrollBar,
  useMediaQuery,
} from '@janhq/joi'

import { atom } from 'jotai'

import { twMerge } from 'tailwind-merge'

import styles from './threadSettings.module.scss'

export const showRightSideBarAtom = atom<boolean>(true)

const ThreadSettings: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <ResizablePanel
      minSize={16}
      maxSize={40}
      defaultSize={28}
      order={3}
      id="ThreadSettingsPanel"
      className={twMerge(isMobile && '!flex-auto', styles.threadSettings)}
    >
      <ScrollArea className={styles.listPanel}>
        <div className="p-4">
          {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => {
            return (
              <p key={x}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                suscipit repudiandae tenetur quam, maiores delectus. Consequatur
                officiis repellat ipsam excepturi tenetur quae earum
                consectetur! Animi illum non maxime nisi doloribus.
              </p>
            )
          })} */}
        </div>
        {isMobile && <ScrollBar orientation="horizontal" />}
      </ScrollArea>
    </ResizablePanel>
  )
}

export default React.memo(ThreadSettings)
