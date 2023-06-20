

/** this will indicate how far the main page was scrolled down (in px) */
export const useGlobalScroll = () => useState('global-scroll', () => 0)

/** increment this value to block main page from scrolling, decrement to unblock. This is not a boolean so multiple places can block simultaneously */
export const useGlobalScrollBlock = () => useState('global-scroll-allowed', () => 0)
