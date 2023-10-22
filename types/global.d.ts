
/**
*  ? Global Interfaces ?
*/

type SerializeObject = /* unresolved */ any

interface Window {
  skipWaiting: any,
  __WB_MANIFEST: any
}

interface IndexSignature {
  [key: string]: string
}

interface Menu {
  title: string,
  url: string,
  menuType: string,
  icon?: string,
}

interface Colors {
  color: string,
  percent: number
}

interface ProgressData {
  color: string,
  duration: number,
  percent: number,
  percentText: string,
  style: string,
  title: string
}