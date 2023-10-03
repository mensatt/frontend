

export namespace EntityOccurrence {

  const occurrenceData = `
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
          stars
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
    kj
    saturatedFat
    carbohydrates
    sugar
    fiber
    protein
    salt
    priceStudent
    priceStaff
    priceGuest
    notAvailableAfter
    tags {
      key
      name
      description
      shortName
      priority
      isAllergy
    }`

  export const queryByDate = gql`
    query getOccurrencesByDate($date: Date!, $locationId: UUID!) {
      occurrences(filter: { startDate: $date, endDate: $date, location: $locationId }) {
        ${occurrenceData}
      }
    }`

  export const queryById = gql`
    query getOccurrencesById($occurrenceId: UUID!) {
      occurrences(filter: { occurrences: [ $occurrenceId ] }) {
        ${occurrenceData}
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
    stars: number
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
    kj: number
    saturatedFat: number
    carbohydrates: number
    sugar: number
    fiber: number
    protein: number
    salt: number
    priceStudent: number
    priceStaff: number
    priceGuest: number
    notAvailableAfter: string
    tags: Tag[]
  }

}
