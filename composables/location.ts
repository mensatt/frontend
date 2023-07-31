import { EntityLocation } from "../utils/entities/location"

/** default locations so we don't have to wait for gql to render the page layout */
const defaultLocations: EntityLocation.Location[] = [
  { id: 'eddfa64d-5f21-4515-97d4-d45e49168116', name: 'Erlangen Südmensa', visible: true },
  { id: '89812062-d3e6-4b2e-abe8-bd8d561aebae', name: 'Erlangen Langemarckplatz', visible: true }
]

//

export const useLocationList = () => useLocalStorage<EntityLocation.Location[]>('location-list', defaultLocations)
export const useSelectedLocation = () => useLocalStorage<EntityLocation.Location>('selected-location', defaultLocations[0])
export const useFavLocations = () => useLocalStorage<string[]>('favourite-locations', [])
