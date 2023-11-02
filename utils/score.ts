import { EntityOccurrence } from '~/utils/entities/occurrence'
import Occurrence = EntityOccurrence.Occurrence

const commonDishPenalty = {
  'kühltheke': 4,
  'suppe': 3,
  'salat': 3,
  'bowl': 2,
  'pizza': 1,
}

function scoreOccurrence(occ: Occurrence): number {
  let score = 10

  const reviewData = occ.dish.reviewData

  // Bump occurrences with more reviews
  score += reviewData.metadata.reviewCount

  // Bump occurrences with any image
  if (reviewData.reviews.some(r => r.images.length > 0))
    score += 1

  const highestPenaltyDish = Object.entries(commonDishPenalty).sort((a, b) => b[1] - a[1])
    .find(([ key, _ ]) => occ.dish.nameDe.toLowerCase().includes(key))

  if(highestPenaltyDish)
    score -= highestPenaltyDish[1]

  return score
}

function sortOccurrences(occurrences: Occurrence[]): Occurrence[] {
  const alphabetical = occurrences.sort((a, b) => a.dish.nameDe.localeCompare(b.dish.nameDe))
  const scored = alphabetical.sort((a, b) => scoreOccurrence(b) - scoreOccurrence(a))
  return scored
}

export const useScore = () => ({
  sortOccurrences
})
