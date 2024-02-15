import { Fragment } from 'react'

import { MinusIcon, XIcon, SquareIcon } from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import LogoMark from '@/containers/Brand/Logo/Mark'

import { MainViewState } from '@/constants/screens'

import { useMainViewState } from '@/hooks/useMainViewState'

import styles from './topBar.module.scss'

const TopBar = () => {
  const { mainViewState } = useMainViewState()

  const titleScreen = (viewStateName: MainViewState) => {
    switch (viewStateName) {
      case MainViewState.LocalServer:
        return 'Local API Server'

      default:
        return MainViewState[viewStateName]?.replace(/([A-Z])/g, ' $1').trim()
    }
  }

  return (
    <Fragment>
      <div
        className={twMerge(
          styles.topBar,
          // Conditional padding only mac have trafficlight icon
          isMac && window.electronAPI ? 'pl-20' : 'pl-4'
        )}
      >
        <div className="inline-flex h-full items-center space-x-4">
          {/* Showing logo on top bar for windows since logo mark on ribbon nav will be hide for windows */}
          {!isMac && <LogoMark width={20} height={20} className="mx-auto" />}
          <h1 className="font-bold">{titleScreen(mainViewState)}</h1>
        </div>
      </div>

      {/* Showing custom toolbar on windows and if app render on app platfrom */}
      {!isMac && window.electronAPI && (
        <div className="fixed right-0 top-0 z-40 flex h-10 items-center overflow-hidden">
          <div
            className="flex h-full flex-shrink-0 items-center justify-center px-3"
            onClick={() => window.electronAPI.minimizeApp()}
          >
            <MinusIcon size={16} />
          </div>
          <div
            className="flex h-full flex-shrink-0 items-center justify-center px-3"
            onClick={() => window.electronAPI.maximizeApp()}
          >
            <SquareIcon size={14} />
          </div>
          <div
            className="flex h-full flex-shrink-0 items-center justify-center px-3"
            onClick={() => window.electronAPI.closeApp()}
          >
            <XIcon size={16} />
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default TopBar
