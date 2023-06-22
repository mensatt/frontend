

export type SettingPrice = 'student' | 'staff' | 'guest'
export const useSettingPrice = () => useLocalStorage<SettingPrice>('usersetting-price', () => 'student')

export type SettingLanguage = 'de' | 'en'
export const useSettingLanguage = () => useLocalStorage<SettingLanguage>('usersetting-language', () => 'de')

export type SettingColorMode = 'auto' | 'light' | 'dark'
export const useSettingColorMode = () => useColorMode()
