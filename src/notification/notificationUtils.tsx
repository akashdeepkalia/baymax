import notifee, { AndroidAction, AndroidImportance, AndroidStyle, IntervalTrigger, RepeatFrequency, TimestampTrigger, TimeUnit, TriggerType } from "@notifee/react-native"


export const createTimestampNotification = async (
    imageUri: string,
    title: string,
    body: string,
    hour: number,
    minute: number,
    notificationId: string
) => {

    const now = new Date()
    const triggerDate = new Date()

    triggerDate.setHours(hour, minute, 0, 0)    // at this time bomb will be fired

    if(triggerDate <= now){
        triggerDate.setDate(triggerDate.getDate()+1)
    }

    const trigger : TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: triggerDate.getTime(),
        repeatFrequency: RepeatFrequency.DAILY,
        alarmManager: true
    }

    const action: AndroidAction={
        title: 'View details',
        pressAction:{
            id: 'view details',
            launchActivity: 'default'
        }
    }

    await notifee.createTriggerNotification(
        {
            id: notificationId,
            title,
            body,
            android: {
                channelId: 'default',
                smallIcon: 'ic_stat_name',
                sound: 'notification',
                 style: {
                    type: AndroidStyle.BIGPICTURE,
                    picture: imageUri || require('../assets/images/launch.png')
                },
                onlyAlertOnce: true, 
                actions: [action]
            }, 
            ios: {
                categoryId: 'default',
                attachments:[
                {
                    url: imageUri || require('../assets/images/launch.png'),
                    thumbnailHidden: false, 
                }
                ],
                interruptionLevel: 'timeSensitive',
                foregroundPresentationOptions:{
                    badge: true,
                    sound: true, 
                    list: true,
                    banner:true
                },
                sound:'notification.wav'
            }
        },
        trigger
    )
}

export const createIntervalNotification = async (
    imageUri: string,
    title: string,
    body: string,
    intervalTime: number,
    timeUnit: TimeUnit
) => {


    const trigger : IntervalTrigger = {
        type: TriggerType.INTERVAL,
        interval: intervalTime,
        timeUnit: timeUnit
    }

    const action: AndroidAction={
        title: 'View details',
        pressAction:{
            id: 'view details',
            launchActivity: 'default'
        }
    }

    await notifee.createTriggerNotification(
        {
            title,
            body,
            android: {
                channelId: 'default',
                smallIcon: 'ic_stat_name',
                sound: 'notification',
                 style: {
                    type: AndroidStyle.BIGPICTURE,
                    picture: imageUri || require('../assets/images/launch.png')
                },
                onlyAlertOnce: true, 
                importance: AndroidImportance.HIGH,
                actions: [action]
            }, 
            ios: {
                categoryId: 'default',
                attachments:[
                {
                    url: imageUri || require('../assets/images/launch.png'),
                    thumbnailHidden: false, 
                }
                ],
                interruptionLevel: 'timeSensitive',
                foregroundPresentationOptions:{
                    badge: true,
                    sound: true, 
                    list: true,
                    banner:true
                },
                sound:'notification.wav'
            }
        },
        trigger
    )
}