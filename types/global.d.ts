declare module 'typeit'

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
  menu_type: string,
  icon?: string,
}

interface Colors {
  color: string,
  percent: number
}

interface ProgressData {
  emoji: string,
  percent: number,
  title: string
}

interface Article {
  title?: string,
  desc?: string,
  raw_article?: string,
  like: number,
  deleted?: boolean,
  update_user_id?: string
}

interface CreateComment {
  name: string,
  message: string,
  password: string
}

interface AccordionItem {
  icon: string,
  label: string,
  slot: string,
  description: string[] | string
}