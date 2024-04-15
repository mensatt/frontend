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
function getImageServingUrl(id: string, opts?: ImageOptions): string {
  const optStr = buildOptions(opts)
  return `${getImageBaseUrl()}/image${id.startsWith('/') ? id : ('/' + id)}${optStr}`
}

/** same as getImageServingUrl but it correctly uses a stepped size and doesn't downscale if a higher quality image is cached */
function buildImageUrl(id: string, minWidth?: number, minHeight?: number): string {
  /** images sizes will be requested in steps of */
  const imagesScaleStepSize = 100

  const steppedMinWidth = minWidth
    ? Math.ceil(minWidth / imagesScaleStepSize) * imagesScaleStepSize
    : undefined

  const steppedMinHeight = minHeight
    ? Math.ceil(minHeight / imagesScaleStepSize) * imagesScaleStepSize
    : undefined

  /** map of image id -> [ largest requested width, largest requested height ] */
  const imageSizes = useState<Map<String, [ number | undefined, number | undefined ]>>('api-cache-image-sizes', () => new Map())

  const cached = imageSizes.value.get(id)

  const requestWidth = steppedMinWidth
    ? cached?.[0]
      ? Math.max(cached[0], steppedMinWidth)
      : steppedMinWidth
    : undefined

  const requestHeight = steppedMinHeight
    ? cached?.[1]
      ? Math.max(cached[1], steppedMinHeight)
      : steppedMinHeight
    : undefined

  imageSizes.value.set(id, [ requestWidth, requestHeight ])
  const experiments = useExperiments()

  if (experiments.isEnabled('show_ref_images')) {
    // "hashing" the image id to a procedural color
    const idHash = id.split('').map(c => c.charCodeAt(0)).reduce((a, b) => a*1.03 + b, 0)
    const backgroundColor = ((idHash ** 15) % 0xFFFFFF).toString(16).padStart(6, '0')
    return `https://dummyimage.com/${requestWidth ?? 999}x${requestHeight ?? 999}/${backgroundColor}`
  }

  return getImageServingUrl(id, {
    width: requestWidth,
    height: requestHeight
  })
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
  getImageServingUrl,
  buildImageUrl
})
