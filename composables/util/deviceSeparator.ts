export const useDeviceSeparator = () => {
  const notification = (deviceSize:number, title:string, message:string, type:string, closable:boolean, grouping:boolean, duration:number, offset:number) => {
    deviceSize < 600
      ? useAlarm().message(type, title, closable, duration, grouping)
      : useAlarm().notify(title, type, message, closable, duration, offset)
  }
  return {
    notification
  }
}
