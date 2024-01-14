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

/**
 * ? Weather Interfaces ?
 */

interface WeatherItem {
  h0?: string,
  h3?: string,
  baseDate: string,
  baseTime: string,
  category: string,
  fcstDate: string,
  fcstTime: string,
  fcstValue: string,
  nx: string,
  ny: string
}

interface CommonLivingInterface {
  [key: string]: string,
  areaNo: string,
  code: string,
  date: string,
  h3: string,
  h6: string,
  h9: string,
  h12: string,
  h15: string,
  h18: string,
  h21: string,
  h24: string,
  h27: string,
  h30: string,
  h33: string,
  h36: string,
  h39: string,
  h42: string,
  h45: string,
  h48: string,
  h51: string,
  h54: string,
  h57: string,
  h60: string,
  h63: string,
  h66: string,
  h69: string,
  h72: string,
  h75: string
}

interface UvItem extends CommonLivingInterface {
  h0: string
}

interface AirDiffusionItem extends CommonLivingInterface {
  h78: string
}

interface WeatherData {
  response: {
    header: {
      resultCode: string,
      resultMsg: string
    },
    body: {
      dataType: string,
      items: {
        item: WeatherItem[] | AirDiffusionItem[] | UvItem[]
      },
      pageNo: number,
      numOfRows: number,
      totalCount: number
    }
  }
}

interface WeatherDataMapType {
  [key: string]: {
    [key: number]: string;
  } | ((value: number | string) => string);
}

interface LivingDataMapType {
  [key: number]: {
    [key: number]: string;
  }
}

interface weatherFirstData {
  sky: string,
  t1h: string,
  vec: string,
  wsd: string
}

interface weatherSecondData {
  pty: string,
  r1n: string,
  reh: string
}

interface UvData {
  location: string,
  uv: string,
  uvIndex: number
}

interface AirDiffusionData {
  location: string,
  diffusion: string,
  diffusionIndex: number
}

/**
 * ? Korean Location Interface ?
 */

interface KoreanLocationCode {
  code: number,
  firstLoc: string,
  secondLoc: string,
  geoX: number,
  geoY: number
}
