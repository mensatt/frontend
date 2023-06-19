

export namespace EntityLocation {

  export const queryAll = gql`
  query getLocations {
    locations {
      id
      name
    }
  }`

  export type Location = {
    id: string
    name: string
  }

}
