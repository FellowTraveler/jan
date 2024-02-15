'use client'

import { PropsWithChildren } from 'react'

import { motion as m } from 'framer-motion'

import { useThemesProviders } from '@/new/hooks/useThemes'

export default function ThemeWrapper({ children }: PropsWithChildren) {
  useThemesProviders()

  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          type: 'spring',
          stiffness: 200,
        },
      }}
    >
      {children}
    </m.div>
  )
}
