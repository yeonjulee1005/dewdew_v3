export const useImageStorage = () => {
  const url = (imageUrl: string, bucket: string, type: string) => {
    return `https://api.dewdew.dev/storage/v1/object/public/${bucket}/${type}/${imageUrl}`
  }
  return {
    url,
  }
}
