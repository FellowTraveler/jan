import React, { PropsWithChildren, useEffect } from 'react'

import { useTheme } from 'next-themes'

import { motion as m } from 'framer-motion'

import { MainViewState } from '@/constants/screens'

import { useMainViewState } from '@/hooks/useMainViewState'

import { SUCCESS_SET_NEW_DESTINATION } from '@/screens/Settings/Advanced/DataFolder'

import styles from './layout.module.scss'

import BottomBar from '@/new/containers/BottomBar'
import RibbonNav from '@/new/containers/RibbonNav'

const BaseLayout = (props: PropsWithChildren) => {
  const { children } = props
  const { mainViewState, setMainViewState } = useMainViewState()

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setTheme(theme as string)
  }, [setTheme, theme])

  useEffect(() => {
    if (localStorage.getItem(SUCCESS_SET_NEW_DESTINATION) === 'true') {
      setMainViewState(MainViewState.Settings)
    }
  }, [setMainViewState])

  return (
    <div className={styles.layoutWrapper}>
      <div className="relative flex flex-col w-full h-full">
        <div className="flex w-full h-[calc(100%-40px)]">
          <RibbonNav />
          <m.div
            key={mainViewState}
            initial={{ opacity: 0, y: -8 }}
            className="h-full w-full"
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
              },
            }}
          >
            {children}
          </m.div>
        </div>
        <BottomBar />
      </div>
    </div>
  )
}

export default BaseLayout
