

export type ThemeObject = {
  id: string
  name: string
  icon: string
  primary?: boolean
}

// ↓ ADD YOUR THEME HERE ↓

const themes = [
  // default / basic themes
  { id: 'auto', name: 'theme_auto', icon: 'material-symbols:auto-mode-rounded', primary: true },
  { id: 'light', name: 'theme_light', icon: 'material-symbols:light-mode-rounded', primary: true },
  { id: 'dark', name: 'theme_dark', icon: 'material-symbols:dark-mode-rounded', primary: true },

  // funky custom themes
  // { id: 'amoled', name: 'theme_amoled', icon: 'theme_dark' },
  // { id: 'green', name: 'theme_green', icon: 'labs' },
] as const satisfies readonly ThemeObject[]

// ↑ ADD YOUR THEME HERE ↑

export type ThemeChoice = typeof themes[number]['id']

export const useThemes = () => ({
  list: [ ...themes ],
  asConfigObject(): Record<ThemeChoice, ThemeChoice> {
    const out = {} as any
    for (const theme of themes)
      out[theme.id] = theme.id
    return out
  },
  asChoicesList() {
    const primary: ThemeObject[] = []
    const secondary: ThemeObject[] = []
    for (const theme of themes) {
      if ((theme as any).primary) primary.push(theme)
      else secondary.push(theme)
    }
    return [ ...primary, null, ...secondary ] as (typeof themes[number] | null)[]
  }
})
