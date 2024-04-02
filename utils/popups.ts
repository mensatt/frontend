import type {DefineComponent} from 'vue'
import { EntityLocation } from './entities/location'
import { EntityOccurrence } from './entities/occurrence'
import PopupSelectMensa from '~/components/popup/SelectMensa.vue'
import PopupTest from '~/components/popup/Test.vue'
import PopupRateDish from '~/components/popup/RateDish.vue'
import PopupSelectOption from '~/components/popup/SelectOption.vue'
import PopupToggleOptions from '~/components/popup/ToggleOptions.vue'
import PopupCalendar from '~/components/popup/Calendar.vue'
import PopupProfileSettings from '~/components/popup/ProfileSettings.vue'
import PopupOccurrencesForDay from '~/components/popup/OccurrencesForDay.vue'
import PopupOccurrenceDetails from '~/components/popup/OccurrenceDetails.vue'

/** REGISTER YOUR POPUP HERE */
export type Popup<T extends String> = {
  id: 'test'
  data: { a: number }
  returns: boolean
} | {
  id: 'select_mensa'
  data: {
    current: EntityLocation.Location,
    options: EntityLocation.Location[]
  }
  returns: EntityLocation.Location
} | {
  id: 'rate_dish'
  data: {
    occurrence: EntityOccurrence.Occurrence
  }
  /** if review was successfully submitted or not */
  returns: boolean
} | {
  id: 'select_option'
  data: {
    title: string
    options: ({
      id: T
      name: string
      icon?: string
      iconFilled?: boolean
    } | null)[]
    /** skips localizing the name -> name will get shown without $t function call */
    skipNameT?: boolean
    selected?: T
  }
  returns: T
} | {
  id: 'toggle_options'
  data: {
    title: string
    options: ({
      id: T
      name: string
      icon?: string
      iconFilled?: boolean
    } | null)[]
    /** skips localizing the name -> name will get shown without $t function call */
    skipNameT?: boolean
    selected?: T[]
  }
  returns: T[]
} | {
  id: 'calendar'
  data: {}
  returns: Date
} | {
  id: 'profile_settings'
  data: {}
  returns: any
} | {
  id: 'occurrences_for_day'
  data: {
    date: Date
  }
  returns: any
} | {
  id: 'occurrence_details'
  data: {
    occurrence: EntityOccurrence.Occurrence
  }
  returns: any
}

/** AND HERE */
export const PopupComponents: Record<Popup<any>['id'], DefineComponent<any, any, any>> = {
  test: PopupTest,
  select_mensa: PopupSelectMensa,
  rate_dish: PopupRateDish,
  select_option: PopupSelectOption,
  toggle_options: PopupToggleOptions,
  calendar: PopupCalendar,
  profile_settings: PopupProfileSettings,
  occurrences_for_day: PopupOccurrencesForDay,
  occurrence_details: PopupOccurrenceDetails
}

export type PositionalData = {
  top?: number
  left?: number
  bottom?: number
  right?: number
  width?: number
}

//

export type PopupInternally = Omit<Popup<any>, 'returns'> & { callback: Function, uuid: number, dismissed: boolean, position?: PositionalData }
type PopupStateManagement = {
  strat: 'push' | 'replace' | 'none'
  url?: string
  revertOnClose?: boolean
}

const getState = () => useState<PopupInternally[]>('popups', () => ([]))
let uuidCounter = 1

export const usePopups = () => {
  const state = getState()
  const route = useRoute()
  return {
    open<T extends string, Id extends Popup<T>['id']>(id: Id, data: (Popup<T> & { id: Id })['data'], position?: PositionalData, stateManagement?: PopupStateManagement): Promise<(Popup<T> & { id: Id })['returns'] | null> {
      const prevRoute = route.fullPath
      const promise = new Promise((callback) => {
        state.value.push({ id, data, callback, uuid: uuidCounter++, dismissed: false, position })

        const strat = stateManagement ? stateManagement.strat : 'push'
        if (strat !== 'none')
          window.history[strat === 'push' ? 'pushState' : 'replaceState']({ ...window.history.state, $popups: state.value.map(p => p.uuid) }, null as any, stateManagement?.url ?? null)
      })

      if (stateManagement?.revertOnClose) {
        return new Promise(async (res) => {
          const out = await promise
          window.history.replaceState(window.history.state, null as any, prevRoute)
          res(out)
        })
      }

      return promise
    },
    get state() {
      return state.value
    }
  }
}
