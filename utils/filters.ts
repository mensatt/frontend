import { EntityOccurrence } from "./entities/occurrence"


type Filters = {
  noMeat: boolean
  noFish: boolean
  noGluten: boolean
  noLactose: boolean
}

type VisibleHidden = {
  visible: EntityOccurrence.Occurrence[],
  hidden: EntityOccurrence.Occurrence[]
}

//

// Since there's no reliable "meat" tag we'll just filter manually
const meatKeywords = [ 'schwein', 'geschnetzelt', 'pute', 'rind', 'hähnchen', 'huhn', 'fleisch', 'wurst', 'steak', 'con carne', 'chicken', 'schäuferle' ]
const veggieKeywords = [ 'fleischlos', 'vegetarisch', 'vegan' ]

function nameDescribesMeat(name: string): boolean {
  const nameLower = name.toLowerCase()
  for (const word of veggieKeywords)
    if (nameLower.includes(word)) return false
  for (const word of meatKeywords)
    if (nameLower.includes(word)) return true
  return false
}

//

function satisfiesFilter(occ: EntityOccurrence.Occurrence, filters: Filters): boolean {
  if (filters.noMeat && nameDescribesMeat(occ.dish.nameDe)) return false
  if (filters.noFish && occ.tags.some(t => (t.key === 'Fi'))) return false
  if (filters.noGluten && !occ.tags.some(t => (t.key === 'Gf'))) return false
  if (filters.noLactose && occ.tags.some(t => (t.key === 'Mi'))) return false
  return true
}

function filterOccurrences(list: EntityOccurrence.Occurrence[]): VisibleHidden {
  const out: VisibleHidden = { visible: [], hidden: [] }

  const filters: Filters = {
    noMeat: useSettingHideMeat().value,
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

export const useFilters = () => ({
  satisfiesFilter,
  filterOccurrences
})
