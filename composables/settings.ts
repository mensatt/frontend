
export type SettingPrice = 'student' | 'staff' | 'guest'
export const useSettingPrice = () => useLocalStorage<SettingPrice>('usersetting-price', () => 'student')

export const useSettingColorMode = () => useColorMode<ThemeChoice>({ modes: useThemes().asConfigObject() })

export const useSettingShowCalories = () => useLocalStorage<boolean>('usersetting-show-calories', () => false)
export const useSettingAutoCycleImages = () => useLocalStorage<boolean>('usersetting-auto-cycle-images', () => true)

export const useSettingHideMeat = () => useLocalStorage<boolean>('usersetting-hide-meat', () => false)
export const useSettingHideMeatDairy = () => useLocalStorage<boolean>('usersetting-hide-meat-dairy', () => false)
export const useSettingHideFish = () => useLocalStorage<boolean>('usersetting-hide-fish', () => false)
export const useSettingHideGluten = () => useLocalStorage<boolean>('usersetting-hide-gluten', () => false)
export const useSettingHideLactose = () => useLocalStorage<boolean>('usersetting-hide-lactose', () => false)

export const useSettingDevMode = () => useLocalStorage<boolean>('devmode-enabled', () => false)
export const useSettingDevBackend = () => useLocalStorage<'prod' | 'dev' | 'local'>('devmode-backend', () => 'prod')
export const useSettingDevExperiments = () => useLocalStorage<ExperimentIds[]>('devmode-experiments', [])
