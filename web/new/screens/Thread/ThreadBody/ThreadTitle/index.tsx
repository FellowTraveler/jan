import { useAtom, useAtomValue } from 'jotai'

import { PanelRightCloseIcon, PenSquareIcon } from 'lucide-react'

import { useCreateNewThread } from '@/hooks/useCreateNewThread'

import styles from './threadTitle.module.scss'

import { assistantsAtom } from '@/helpers/atoms/Assistant.atom'
import {
  activeThreadAtom,
  threadListLeftPanelAtom,
} from '@/helpers/atoms/Thread.atom'

const ThreadTitle = () => {
  const [threadListLeftPanel, setThreadListLeftPanel] = useAtom(
    threadListLeftPanelAtom
  )

  const activeThread = useAtomValue(activeThreadAtom)
  const assistants = useAtomValue(assistantsAtom)
  const { requestCreateNewThread } = useCreateNewThread()

  const onCreateConversationClick = async () => {
    if (assistants.length === 0) {
      alert('No assistant available')
    } else {
      requestCreateNewThread(assistants[0])
    }
  }

  return (
    <div className={styles.threadTitle}>
      <div className="flex gap-x-8 w-full">
        {!threadListLeftPanel && (
          <div className="flex gap-x-4">
            <PanelRightCloseIcon
              size={20}
              className="cursor-pointer unset-drag"
              onClick={() => setThreadListLeftPanel(true)}
            />
            <PenSquareIcon
              size={20}
              data-testid="btn-create-thread"
              className="cursor-pointer unset-drag"
              onClick={onCreateConversationClick}
            />
          </div>
        )}
        <h6 className="font-semibold line-clamp-1  w-full">
          {activeThread ? activeThread?.title : 'New Thread'}
        </h6>
      </div>
    </div>
  )
}

export default ThreadTitle
