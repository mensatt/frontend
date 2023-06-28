

/** this will indicate how far the main page was scrolled down (in px) */
export const useGlobalScroll = () => useState('global-scroll', () => 0)

/** increment this value to block main page from scrolling, decrement to unblock. This is not a boolean so multiple places can block simultaneously */
export const useGlobalScrollBlock = () => useState('global-scroll-allowed', () => 0)

/** increment this value to indicate you're tracking a gesture. Check if this value is 0 before allowing a gesture. */
export const useGlobalGestureTracked = () => useState('global-gesture-tracked', () => 0)

/** html element that is globally scrolling */
export const useGlobalScrollContainer = () => useState<HTMLElement | null>('global-scroll-container', () => null)
