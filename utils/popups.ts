import { DefineComponent } from "nuxt/dist/app/compat/capi"
import PopupSelectMensa from "~/components/popup/SelectMensa.vue"
import PopupTest from "~/components/popup/Test.vue"
import { EntityLocation } from "./entities/location"


/** REGISTER YOUR POPUP HERE */
export type Popup = {
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
}

/** AND HERE */
export const PopupComponents: Record<Popup['id'], DefineComponent<any, any, any>> = {
  test: PopupTest,
  select_mensa: PopupSelectMensa
}

//

export type PopupInternally = Omit<Popup, 'returns'> & { callback: Function, uuid: number, dismissed: boolean }

const getState = () => useState<PopupInternally[]>('popups', () => ([]))
let uuidCounter = 0

export const usePopups = () => ({
  open<Id extends Popup['id']>(id: Id, data: (Popup & { id: Id })['data']): Promise<(Popup & { id: Id })['returns'] | null> {
    return new Promise((callback) => getState().value.push({ id, data, callback, uuid: uuidCounter++, dismissed: false }))
  },
  get state() {
    return getState().value
  } 
})
