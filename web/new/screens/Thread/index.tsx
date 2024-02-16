/* eslint-disable @typescript-eslint/naming-convention */
import React, { Fragment, useContext, useEffect, useState } from 'react'

import { useDropzone } from 'react-dropzone'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  ScrollBar,
  useMediaQuery,
} from '@janhq/joi'
import { m } from 'framer-motion'
import { useAtomValue, useSetAtom } from 'jotai'

import { UploadCloudIcon } from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import { fileUploadAtom } from '@/containers/Providers/Jotai'
import { showLeftSideBarAtom } from '@/containers/Providers/KeyListener'

import { snackbar } from '@/containers/Toast'

import { FeatureToggleContext } from '@/context/FeatureToggle'

import { activeModelAtom } from '@/hooks/useActiveModel'
import { queuedMessageAtom, reloadModelAtom } from '@/hooks/useSendChatMessage'

import ThreadBody from './ThreadBody'
import ThreadList from './ThreadList'
import ThreadSettings from './ThreadSettings'

import { threadListLeftPanelAtom } from '@/helpers/atoms/Thread.atom'

const ThreadScreen = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const threadListLeftPanel = useAtomValue(threadListLeftPanelAtom)
  const [layoutSize, setlayoutSize] = useState([22, 50, 28])

  return (
    <div className="flex h-full w-full">
      <ResizablePanelGroup
        direction={isMobile ? 'vertical' : 'horizontal'}
        id="threadScreen"
        autoSaveId="threadScreen"
        className="w-full "
      >
        {threadListLeftPanel && (
          <Fragment>
            <ThreadList />
            <ResizableHandle disabled={isMobile} />
          </Fragment>
        )}
        <ThreadBody />
        <ResizableHandle disabled={isMobile} />
        <ThreadSettings />
      </ResizablePanelGroup>
    </div>
  )
}

export default ThreadScreen
