

/** this will indicate how far the main page was scrolled down (in px) */
export const useGlobalScroll = () => useState('global-scroll', () => 0)

/** increment this value to block main page from scrolling, decrement to unblock. This is not a boolean so multiple places can block simultaneously */
export const useGlobalScrollBlock = () => useState('global-scroll-allowed', () => 0)

/** increment this value to indicate you're tracking a gesture. Check if this value is 0 before allowing a gesture. */
export const useGlobalGestureTracked = () => useState('global-gesture-tracked', () => 0)

/** html element that is globally scrolling */
export const useGlobalScrollContainer = () => useState<HTMLElement | null>('global-scroll-container', () => null)

/** visible height of the global header. is equal to fullHeight (below) when fully visible, is 0 when hidden through scrolling */
export const useGlobalHeaderHeight = () => useState<number>('global-header-height', () => 0)

/** height of the global header element. Just height. Not changing unless screen resized. */
export const useGlobalHeaderFullHeight = () => useState<number>('global-header-full-height', () => 0)

/** height of the global nav element. Just height. Not changing unless screen resized. */
export const useGlobalNavFullHeight = () => useState<number>('global-nav-full-height', () => 0)

/** the date we're looking at right now. */
export const useGlobalSelectedDate = () => useState<Date>('global-selected-date', () => new Date())
