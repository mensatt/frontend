import { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import { EntityOccurrence } from './entities/occurrence'
import { EntityLocation } from './entities/location'
import { EntityReview } from './entities/review'

function getClient() {
  return useSettingDevMode().value
    ? useSettingDevBackend().value
    : 'prod'
}


type GqlResponse = _AsyncData<{ occurrences: EntityOccurrence.Occurrence[] }, Error>
const occurrenceCache: Map<string, GqlResponse> = new Map()

async function getOccurrences(locationId: string, date: Date): Promise<GqlResponse> {
  const dateStr = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  const client = getClient()
  const cacheKey = `ld:${client}:${locationId}:${dateStr}`

  if (occurrenceCache.has(cacheKey))
    return occurrenceCache.get(cacheKey)!

  const res = await useLazyAsyncQuery<{ occurrences: EntityOccurrence.Occurrence[] }>({
    query: EntityOccurrence.queryByDate,
    variables: { locationId, date: dateStr },
    clientId: client
  })
  occurrenceCache.set(cacheKey, res)
  // TODO fill all occurrences loaded here into the cache with their own occurrenceId key so we don't need to re-fetch this data if a user clicks on details
  return res
}

async function getOccurrence(occurrenceId: string): Promise<GqlResponse> {
  const client = getClient()
  const cacheKey = `id:${client}:${occurrenceId}`

  if (occurrenceCache.has(cacheKey))
    return occurrenceCache.get(cacheKey)!

  const res = await useLazyAsyncQuery<{ occurrences: EntityOccurrence.Occurrence[] }>({
    query: EntityOccurrence.queryById,
    variables: { occurrenceId },
    clientId: client
  })
  occurrenceCache.set(cacheKey, res)
  return res
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

type ImageOptions = {
  width?: number
  height?: number
  quality?: number
}
function buildOptions(opts?: ImageOptions) {
  if (!opts) return ''
  if (!opts.width && !opts.height) return ''

  return '?' + [
    `width=${opts.width ?? 0}`,
    `height=${opts.height ?? 0}`,
    `quality=${opts.quality ?? 0}`,
  ].join('&')
}
function getImageUrl(id: string, opts?: ImageOptions): string {
  const backend = getClient()
  const optStr = buildOptions(opts)
  return (backend === 'local')
    ? `https://localhost:4000${id}${optStr}`
    : (backend === 'dev')
      ? `https://dev-api.mensatt.de${id}${optStr}`
      : `https://api.mensatt.de${id}${optStr}`
}

//

export const useApi = () => ({
  getOccurrences,
  getOccurrence,
  getLocations,
  postRating,
  getImageUrl
})
