import { EntityOccurrence } from "~/utils/entities/occurrence"
import Occurrence = EntityOccurrence.Occurrence

const commonDishes = [ 'pizza', 'suppe', 'salat', 'bowl', 'kühltheke' ]

function scoreOccurrence(occ: Occurrence): number {
  let score = 10

  const reviewData = occ.dish.reviewData

  // Bump occurrences with more reviews
  score += reviewData.metadata.reviewCount

  // Bump occurrences with any image
  if (reviewData.reviews.some(r => r.images.length > 0))
    score += 1

  // Punish "always" available dishes
  if (commonDishes.some(c => occ.dish.nameDe.toLowerCase().includes(c)))
    score -= 1

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
