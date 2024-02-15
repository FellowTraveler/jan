import {
  ResizablePanel,
  ScrollArea,
  ScrollBar,
  useMediaQuery,
} from '@janhq/joi'

import { useAtomValue } from 'jotai'

import { twMerge } from 'tailwind-merge'

import CreateNewThread from './CreateNewThread'

import styles from './threadList.module.scss'

import { threadsAtom } from '@/helpers/atoms/Thread.atom'

const ThreadList = () => {
  const threads = useAtomValue(threadsAtom)

  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <ResizablePanel
      minSize={16}
      maxSize={40}
      order={1}
      id="ThreadListPanel"
      defaultSize={22}
      className={twMerge(isMobile && '!flex-auto', styles.threadList)}
    >
      <ScrollArea className={styles.listPanel}>
        <CreateNewThread />
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

export default ThreadList
