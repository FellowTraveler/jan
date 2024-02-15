import { useAtomValue, useSetAtom } from 'jotai'
import { PenSquareIcon, PanelRightOpenIcon } from 'lucide-react'

import { useCreateNewThread } from '@/hooks/useCreateNewThread'

import styles from './createNewThread.module.scss'

import { assistantsAtom } from '@/helpers/atoms/Assistant.atom'
import { threadListLeftPanelAtom } from '@/helpers/atoms/Thread.atom'

const CreateNewThread = () => {
  const assistants = useAtomValue(assistantsAtom)
  const setThreadListLeftPanel = useSetAtom(threadListLeftPanelAtom)
  const { requestCreateNewThread } = useCreateNewThread()

  const onCreateConversationClick = async () => {
    if (assistants.length === 0) {
      alert('No assistant available')
    } else {
      requestCreateNewThread(assistants[0])
    }
  }
  return (
    <div className={styles.createNewThread}>
      <PanelRightOpenIcon
        size={20}
        className="cursor-pointer unset-drag"
        onClick={() => setThreadListLeftPanel(false)}
      />
      <PenSquareIcon
        data-testid="btn-create-thread"
        size={20}
        className="cursor-pointer unset-drag"
        onClick={onCreateConversationClick}
      />
    </div>
  )
}

export default CreateNewThread
