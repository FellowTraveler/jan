/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect, useState } from 'react'

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

import ThreadList from './ThreadList'

import ThreadSettings from './ThreadSettings'

const ThreadScreen = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div className="flex h-full w-full">
      <ResizablePanelGroup direction={isMobile ? 'vertical' : 'horizontal'}>
        {/* TODO Faisal check back showLeftSideBar */}
        {/* Left sidebar */}
        <ThreadList />

        <ResizableHandle disabled={isMobile} />

        <ResizablePanel minSize={40}>
          <ScrollArea className="h-full w-full">
            <div className="px-4 pb-4 pt-2 md:px-6 md:pt-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => {
                return (
                  <p key={x}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Earum suscipit repudiandae tenetur quam, maiores delectus.
                    Consequatur officiis repellat ipsam excepturi tenetur quae
                    earum consectetur! Animi illum non maxime nisi doloribus.
                  </p>
                )
              })}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => {
                return (
                  <p key={x}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Earum suscipit repudiandae tenetur quam, maiores delectus.
                    Consequatur officiis repellat ipsam excepturi tenetur quae
                    earum consectetur! Animi illum non maxime nisi doloribus.
                  </p>
                )
              })}
            </div>
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle disabled={isMobile} />

        {/* Right side bar */}
        {/* TODO Faisal check back showRightSideBar */}
        {/* Right / Setting sidebar */}
        <ThreadSettings />
      </ResizablePanelGroup>
    </div>
  )
}

export default ThreadScreen
