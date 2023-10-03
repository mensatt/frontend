export function formatPrice(price: number | null): string {
    if(price === null) return '–- '

    return (price / 100)
        .toLocaleString(
            undefined,
            {minimumFractionDigits: 2, maximumFractionDigits: 2}
        )
}
