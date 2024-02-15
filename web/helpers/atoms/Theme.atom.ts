import { atom } from 'jotai'

export const janTheme = 'janTheme'
export const defaultTheme = 'joi-dark'

export const themeOptionsAtom = atom<string[]>([])
export const themeAtom = atom<string>('')
