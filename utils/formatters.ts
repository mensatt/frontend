import { EntityOccurrence } from "./entities/occurrence"

function formatPrice(price: number | null): string {
  if (price === null) return '-- '
  return (price / 100).toFixed(2)
}

function localizeDishName(dish: EntityOccurrence.Dish): string {
  const i18n = useI18n()

  if (i18n.locale.value === 'de' && dish.nameDe)
    return dish.nameDe
  if (i18n.locale.value === 'en' && dish.nameEn)
    return dish.nameEn

  return dish.nameDe ?? dish.nameEn
}

export const useFormatters = () => ({
  formatPrice,
  localizeDishName
})
