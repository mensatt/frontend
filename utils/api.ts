import { _AsyncData } from "nuxt/dist/app/composables/asyncData"
import { EntityOccurrence } from "./entities/occurrence"


type GqlResponse = _AsyncData<{ occurrences: EntityOccurrence.Occurrence[] }, Error>
const occurrenceCache: Map<string, GqlResponse> = new Map()
async function getOccurrences(locationId: string, date: Date): Promise<GqlResponse> {
  const dateStr = date.toISOString().split('T')[0]
  const cacheKey = `${locationId}:${dateStr}`

  if (occurrenceCache.has(cacheKey))
    return occurrenceCache.get(cacheKey)!

  const res = await useAsyncQuery<{ occurrences: EntityOccurrence.Occurrence[] }>(EntityOccurrence.queryByDate, { locationId, date: dateStr })
  occurrenceCache.set(cacheKey, res)
  return res
}

function getImageUrl(image: EntityOccurrence.Image): string {
  return `https://api.mensatt.de${image.imageUrl}`
}

//

export const useApi = () => ({
  getOccurrences,
  getImageUrl
})
