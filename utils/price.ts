
export function format(price: number | null): string {
  if (price === null) return '-- '
  return (price / 100).toFixed(2)
}

export const usePrices = () => ({
  format
})
