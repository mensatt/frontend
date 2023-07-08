

export type ViewMode = 'mobile' | 'desktop'
export const useViewMode = () => useState<ViewMode>('view-mode', () => 'mobile')
