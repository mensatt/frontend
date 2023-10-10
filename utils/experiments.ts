

export type ExperimentObject = {
  id: string
  name: string
  authors: readonly string[]
}

// ↓ ADD YOUR EXPERIMENTS HERE ↓

const experiments = [
  {
    id: 'alt_layout_desktop',
    name: 'Alternative Desktop Layout',
    authors: [ 'maanex' ]
  },
  {
    id: 'account_ui',
    name: 'Show UI for account management',
    authors: [ 'maanex' ]
  }
] as const satisfies readonly ExperimentObject[]

// ↑ ADD YOUR EXPERIMENTS HERE ↑

export type ExperimentIds = typeof experiments[number]['id']

export const useExperiments = () => ({
  list: [...experiments],
  asChoicesList() {
    return experiments.map(e => ({
      id: e.id,
      name: e.name
    }))
  },
  isEnabled(id: ExperimentIds) {
    const devMode = useSettingDevMode()
    if (!devMode.value) return false
    const enabled = useSettingDevExperiments()
    return enabled.value.includes(id)
  }
})
