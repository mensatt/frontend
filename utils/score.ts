import { EntityOccurrence } from "~/utils/entities/occurrence"
import Occurrence = EntityOccurrence.Occurrence

const commonDishPenalty = {
    'pizza': 1,
    'suppe': 3,
    'salat': 3,
    'bowl': 2,
    'kühltheke': 4,
}

function scoreOccurrence(occ: Occurrence): number {
  let score = 10

  const reviewData = occ.dish.reviewData

  // Bump occurrences with more reviews
  score += reviewData.metadata.reviewCount

  // Bump occurrences with any image
  if (reviewData.reviews.some(r => r.images.length > 0))
    score += 1

  let highestPenalty = 0
  for (const commonKey in commonDishPenalty) {
    if (occ.dish.nameDe.toLowerCase().includes(commonKey)) {
        const penalty = commonDishPenalty[commonKey]
        if (penalty > highestPenalty)
            highestPenalty = penalty
    }
  }

  score -= highestPenalty

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
