import { ElMessage, ElNotification } from 'element-plus'

export const useAlarm = () => {
  const notify = (title:string, type:any, message:string, showClose:boolean, duration:number, offset:number) => {
    ElNotification({
      title,
      message,
      showClose,
      type,
      duration,
      offset
    })
  }

  const message = (type:any, message:string, showClose:boolean, duration:number, grouping:boolean) => {
    ElMessage({
      type,
      message,
      showClose,
      duration,
      grouping
    })
  }

  const returnErrorMessage = (messageData:any, extraText:string) => {
    if (!messageData.data) {
      notify('', 'warning', messageData, true, 10000, 60)
      return
    }
    if (messageData.data.statusCode >= 300) {
      notify('', 'warning', messageData.data.message.concat(': ', String(messageData.data.statusCode)), true, 10000, 60)
      return
    }
    const errorMessage = messageData.data.error.message
    switch (messageData) {
      case true :
        notify('', 'warning', extraText, true, 10000, 60)
        break
      default :
        notify('', 'warning', errorMessage, true, 10000, 60)
    }
  }
  return {
    notify,
    message,
    returnErrorMessage
  }
}
