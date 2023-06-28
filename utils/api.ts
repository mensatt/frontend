import { _AsyncData } from "nuxt/dist/app/composables/asyncData"
import { EntityOccurrence } from "./entities/occurrence"
import { EntityLocation } from "./entities/location"
import { EntityReview } from "./entities/review"

function getClient() {
  return useSettingDevMode().value
    ? useSettingDevBackend().value
    : 'prod'
}


type GqlResponse = _AsyncData<{ occurrences: EntityOccurrence.Occurrence[] }, Error>
const occurrenceCache: Map<string, GqlResponse> = new Map()
async function getOccurrences(locationId: string, date: Date): Promise<GqlResponse> {
  const dateStr = date.toISOString().split('T')[0]
  const client = getClient()
  const cacheKey = `${locationId}:${dateStr}:${client}`

  if (occurrenceCache.has(cacheKey))
    return occurrenceCache.get(cacheKey)!

  const res = await useLazyAsyncQuery<{ occurrences: EntityOccurrence.Occurrence[] }>({
    query: EntityOccurrence.queryByDate,
    variables: { locationId, date: dateStr },
    clientId: client
  })
  occurrenceCache.set(cacheKey, res)
  return res
}

async function getOccurrence(occurrenceId: string): Promise<GqlResponse> {
  return null as any // TODO
}

/** @returns a list of all found locations or null if network error */
async function getLocations(): Promise<EntityLocation.Location[] | null> {
  const res = await useAsyncQuery<{ locations: EntityLocation.Location[] }>(
    EntityLocation.queryAll,
    getClient()
  )
  return res.data?.value.locations ?? null
}

/** @returns true if successful */
async function postRating(variables: EntityReview.AddVariables): Promise<boolean> {
  const { mutate } = useMutation(
    EntityReview.mutationAdd,
    { variables, clientId: getClient() },
  )
  const res = await mutate().catch((err) => { console.error(err); return null })
  return !!res?.data
}

function getImageUrl(image: EntityOccurrence.Image): string {
  const backend = getClient()
  return (backend === 'local')
    ? `https://localhost:4000${image.imageUrl}`
    : (backend === 'dev')
      ? `https://dev-api.mensatt.de${image.imageUrl}`
      : `https://api.mensatt.de${image.imageUrl}`
}

//

export const useApi = () => ({
  getOccurrences,
  getOccurrence,
  getLocations,
  postRating,
  getImageUrl
})
