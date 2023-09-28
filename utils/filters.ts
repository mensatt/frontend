import { EntityOccurrence } from "./entities/occurrence"

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

const meatTags = ['S', 'R', 'G', 'L', 'W', 'F', 'MSC', 'Kr', 'We']
const meatDairyTags = meatTags.concat(['Ei', 'Mi'])

function satisfiesFilter(occ: EntityOccurrence.Occurrence, filters: Filters): boolean {
  if (filters.noMeat && (intersect(occ.tags.map(t => t.key), meatTags).length > 0
                        || !occ.tags.some(t => (t.key === 'Veg') || (t.key == 'V')))) return false
  if (filters.noMeatDairy && (intersect(occ.tags.map(t => t.key), meatDairyTags).length > 0
                        || !occ.tags.some(t => (t.key == 'Veg')))) return false
  if (filters.noFish && occ.tags.some(t => (t.key === 'Fi'))) return false
  if (filters.noGluten && !occ.tags.some(t => (t.key === 'Gf'))) return false
  if (filters.noLactose && occ.tags.some(t => (t.key === 'Mi'))) return false
  return true
}

function filterOccurrences(list: EntityOccurrence.Occurrence[]): VisibleHidden {
  const out: VisibleHidden = { visible: [], hidden: [] }

  const filters: Filters = {
    noMeat: useSettingHideMeat().value,
    noMeatDairy: useSettingHideMeatDairy().value,
    noFish: useSettingHideFish().value,
    noGluten: useSettingHideGluten().value,
    noLactose: useSettingHideLactose().value,
  }

  for (const item of list) {
    if (satisfiesFilter(item, filters))
      out.visible.push(item)
    else
      out.hidden.push(item)
  }

  return out
}

function intersect(a: Array<string>, b: Array<string>): Array<string> {
  var setB = new Set(b);
  return [...new Set(a)].filter(x => setB.has(x));
}

export const useFilters = () => ({
  satisfiesFilter,
  filterOccurrences
})
