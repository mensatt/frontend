/* eslint-disable curly */
import { EntityOccurrence } from './entities/occurrence'

type Filters = {
  noMeat: boolean
  noMeatDairy: boolean
  noFish: boolean
  noGluten: boolean
  noLactose: boolean
}

type VisibleHidden = {
  visible: EntityOccurrence.Occurrence[],
  hidden: EntityOccurrence.Occurrence[]
}

//

const fishTags = [ 'Fi', 'F', 'MSC' ]
const meatTags = [ 'S', 'R', 'G', 'L', 'W', 'Kr', 'We' ]
const meatDairyTags = [ ...meatTags, 'Ei', 'Mi' ]

function arrayContainsAny(array: Array<string>, ...contains: Array<string>): boolean {
  return contains.some(v => array.includes(v))
}

function satisfiesFilter(occ: EntityOccurrence.Occurrence, filters: Filters): boolean {
  const tagKeys = occ.tags.map(t => t.key)

  if (filters.noMeat) {
    if (arrayContainsAny(tagKeys, ...meatTags)) return false
    if (!arrayContainsAny(tagKeys, 'Veg', 'V')) return false
  }

  if (filters.noMeatDairy) {
    if (arrayContainsAny(tagKeys, ...meatDairyTags)) return false
    if (!arrayContainsAny(tagKeys, 'Veg')) return false
  }

  if (filters.noFish) {
    if (arrayContainsAny(tagKeys, ...fishTags)) return false
  }

  if (filters.noGluten) {
    if (!arrayContainsAny(tagKeys, 'Gf')) return false
  }

  if (filters.noLactose) {
    if (arrayContainsAny(tagKeys, 'Mi')) return false
  }

  return true
}

type FilterOptions = {
  sort: boolean
  hideUnavailable: boolean
}
function filterOccurrences(list: EntityOccurrence.Occurrence[], opts: Partial<FilterOptions> = {}): VisibleHidden {
  const { sort = false, hideUnavailable = false } = opts

  const out: VisibleHidden = { visible: [], hidden: [] }

  const filters: Filters = {
    noMeat: useSettingHideMeat().value,
    noMeatDairy: useSettingHideMeatDairy().value,
    noFish: useSettingHideFish().value,
    noGluten: useSettingHideGluten().value,
    noLactose: useSettingHideLactose().value,
  }

  for (const item of list) {
    if (hideUnavailable && item.notAvailableAfter)
      out.hidden.push(item)
    else if (satisfiesFilter(item, filters))
      out.visible.push(item)
    else
      out.hidden.push(item)
  }

  if (!sort)
    return out

  const score = useScore()
  return {
    visible: score.sortOccurrences(out.visible),
    hidden: score.sortOccurrences(out.hidden)
  }
}

export const useFilters = () => ({
  satisfiesFilter,
  filterOccurrences
})
