import { useEffect, useState } from 'react'

import { ScrollArea } from '@janhq/uikit'
import { motion as m } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

type Props = {
  activeMenu: string
  onMenuClick: (menu: string) => void
}

const SettingMenu: React.FC<Props> = ({ activeMenu, onMenuClick }) => {
  const [menus, setMenus] = useState<string[]>([])

  useEffect(() => {
    const menu = ['My Models', 'My Settings', 'Advanced Settings']

    if (typeof window !== 'undefined' && window.electronAPI) {
      menu.push('Extensions')
    }
    setMenus(menu)
  }, [])

  return (
    <div className="flex h-full w-64 flex-shrink-0 flex-col overflow-y-auto border-r border-border">
      <ScrollArea className="h-full w-full">
        <div className="px-6 py-4 flex-shrink-0 font-medium">
          {menus.map((menu) => {
            const isActive = activeMenu === menu
            return (
              <div
                key={menu}
                className="relative my-0.5 block py-1.5 cursor-pointer"
                onClick={() => onMenuClick(menu)}
              >
                <span className={twMerge(isActive && 'relative z-10')}>
                  {menu}
                </span>

                {isActive && (
                  <m.div
                    className="absolute inset-0 -left-3 h-full w-[calc(100%+24px)] rounded-md bg-primary/50"
                    layoutId="active-static-menu"
                  />
                )}
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

export default SettingMenu
