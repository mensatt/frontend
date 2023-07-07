
export type SettingPrice = 'student' | 'staff' | 'guest'
export const useSettingPrice = () => useLocalStorage<SettingPrice>('usersetting-price', () => 'student')

export type SettingColorMode = 'auto' | 'light' | 'dark'
export const useSettingColorMode = () => useColorMode()

export const useSettingHideMeat = () => useLocalStorage<boolean>('usersetting-hide-meat', () => false)
export const useSettingHideFish = () => useLocalStorage<boolean>('usersetting-hide-fish', () => false)
export const useSettingHideGluten = () => useLocalStorage<boolean>('usersetting-hide-gluten', () => false)

export const useSettingDevMode = () => useLocalStorage<boolean>('devmode-enabled', () => false)
export const useSettingDevBackend = () => useLocalStorage<'prod' | 'dev' | 'local'>('devmode-backend', () => 'prod')
