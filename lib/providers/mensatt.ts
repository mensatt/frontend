
export const getImage = (src: string, { modifiers } = {} as any) => {
  const api = useApi()

  return {
    url: api.getImageServingUrl(src, modifiers)
    // url: `https://dummyimage.com/${modifiers.width ?? 999}x${modifiers.height ?? 999}`
  }
}
