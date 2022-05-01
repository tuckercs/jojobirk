export const decodeAssetUrl = (id) => {
  const pattern = /^(?:image|file)-([a-f\d]+)-(?:(\d+x\d+)-)?(\w+)$/
  const [, assetId, dimensions, format] = pattern.exec(id)

  const [width, height] = dimensions
    ? dimensions.split('x').map((v) => parseInt(v, 10))
    : []

  return {
    assetId,
    dimensions: { width, height },
    format,
  }
}
