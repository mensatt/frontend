
export const getImage = (src: string, { modifiers } = {} as any) => {
  const api = useApi()

  return {
    url: api.getImageUrl(src, modifiers)
    // url: `https://dummyimage.com/${modifiers.width ?? 999}x${modifiers.height ?? 999}`
  }
}
