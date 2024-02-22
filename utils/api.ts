import { EntityOccurrence } from './entities/occurrence'
import { EntityLocation } from './entities/location'
import { EntityReview } from './entities/review'
import type { AsyncData } from '#app'


function getClient() {
  return useSettingDevMode().value
    ? useSettingDevBackend().value
    : 'prod'
}


type GqlResponse = AsyncData<{ occurrences: EntityOccurrence.Occurrence[] }, Error>
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

async function uploadImage(file: File, rotation?: number): Promise<string | null> {
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch(
    getImageUploadUrl(rotation),
    { method: 'POST', body: formData }
  ).catch(console.error)

  return res?.text() ?? null
}

type ImageOptions = {
  width?: number
  height?: number
  quality?: number
}
function buildOptions(opts?: ImageOptions) {
  if (!opts) return ''

  // Image service does not like 0 values behaving as "not set"
  const params = Object.entries(opts)
    .filter(([ _, v ]) => v)
    .map(([ k, v ]) => `${k}=${v}`)
    .join('&')

  return params ? `?${params}` : ''
}
export function getImageServingUrl(id: string, opts?: ImageOptions): string {
  const optStr = buildOptions(opts)
  return `${getImageBaseUrl()}/image${id}${optStr}`
}

function getImageUploadUrl(rotation?: number) {
  const params = rotation ? `?angle=${rotation}` : ''
  return `${getImageBaseUrl()}/upload${params}`
}

function getImageBaseUrl(): string {
  const backend = getClient()
  return (backend === 'local')
    ? 'https://localhost:4000/content'
    : (backend === 'dev')
      ? 'https://dev-api.mensatt.de/content'
      : 'https://api.mensatt.de/content'
}

//

export const useApi = () => ({
  getOccurrences,
  getOccurrence,
  getLocations,
  postRating,
  uploadImage,
  getImageServingUrl
})
