export const useImageStorage = () => {
  const url = (imageUrl:string, bucket:string, type:string) => {
    return `https://tgtlrqqasaiavynmlxkc.supabase.co/storage/v1/object/public/${bucket}/${type}/${imageUrl}`
  }
  return {
    url
  }
}
