

export namespace EntityOccurrence {

  export const queryByDate = gql`
  query getOccurrencesByDate($date: Date!, $locationId: UUID!) {
    occurrences(filter: { startDate: $date, endDate: $date, location: $locationId }) {
      id
      dish {
        id
        nameDe
        nameEn
        reviewData(filter: { approved: true }) {
          reviews {
            id
            displayName
            text
            createdAt
            images {
              id
              imageUrl
            }
          }
          metadata {
            averageStars
            reviewCount
          }
        }
      }
      sideDishes {
        id
        nameDe
      }
      date
      kcal
      priceStudent
      priceStaff
      priceGuest
      tags {
        key
        name
        description
        shortName
        priority
        isAllergy
      }
    }
  }`

  export type Image = {
    id: string
    imageUrl: string
  }

  export type Review = {
    id: string
    displayName: string
    text: string
    createdAt: string
    images: Image[]
  }

  export type Dish = {
    id: string
    nameDe: string
    nameEn: string
    reviewData: {
      reviews: Review[]
      metadata: {
        averageStars: number | null
        reviewCount: number
      }
    }
  }

  export type Priority = 'HIDE' | 'LOW' | 'MEDIUM' | 'HIGH'

  export type Tag = {
    key: string
    name: string
    description: string
    shortName: string
    priority: Priority
    isAllergy: boolean
  }

  export type Occurrence = {
    id: string
    dish: Dish
    sideDishes: Dish[]
    date: string
    kcal: number
    priceStudent: number
    priceStaff: number
    priceGuest: number
    tags: Tag[]
  }

}
