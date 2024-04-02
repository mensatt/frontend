

export type ExperimentObject = {
  id: string
  name: string
  authors: readonly string[]
}

// ↓ ADD YOUR EXPERIMENTS HERE ↓

const experiments = [
  {
    id: 'show_ids',
    name: 'Show Ids',
    authors: [ 'maanex' ]
  },
  {
    id: 'alt_layout_desktop',
    name: 'Alternative Desktop Layout',
    authors: [ 'maanex' ]
  },
  {
    id: 'account_ui',
    name: 'Show UI for account management',
    authors: [ 'maanex' ]
  },
  {
    id: 'new_pills',
    name: 'Show alternative pills ui',
    authors: [ 'maanex' ]
  }
] as const satisfies readonly ExperimentObject[]

// ↑ ADD YOUR EXPERIMENTS HERE ↑

export type ExperimentIds = typeof experiments[number]['id']

export const useExperiments = () => {
  const devMode = useSettingDevMode()
  const devExperiments = useSettingDevExperiments()

  return {
    list: [ ...experiments ],
    asChoicesList() {
      return experiments.map(e => ({
        id: e.id,
        name: e.name
      }))
    },
    isEnabled(id: ExperimentIds) {
      if (!devMode.value) return false
      return devExperiments.value.includes(id)
    }
  }
}
