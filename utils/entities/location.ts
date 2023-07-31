

export namespace EntityLocation {

  export const queryAll = gql`
  query getLocations {
    locations {
      id
      name
      visible
    }
  }`

  export type Location = {
    id: string
    name: string
    visible: boolean
  }

}
