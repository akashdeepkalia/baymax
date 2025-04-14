import { Alert } from 'react-native';
import notifee, { AndroidStyle } from '@notifee/react-native';

export const addBadgeCount = () => {
    notifee.setBadgeCount(1).then(()=> console.log("Badge count set!"))
}

export const displayNotification = async (
    title: string, 
    message: string, 
    image: string, 
    categotyId: string
) => {
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'notification'   // this is from raw in android folder
      });

      await notifee.displayNotification({
        title: title,
        body: message, 
        android: {
            channelId: channelId,
            smallIcon: 'ic_stat_name',
            sound: 'notification',
            style: {
              type: AndroidStyle.BIGPICTURE,
              picture: image || require('../assets/images/launch.png')
            },
            onlyAlertOnce: true, 
            actions: [
              {
                title: 'Okay',
                pressAction: {
                  id: categotyId,
                  launchActivity: 'default' //while index.js
                }
              }
            ]
        }, 
        ios: {
          categoryId: categotyId,
          attachments:[
            {
              url: image || require('../assets/images/launch.png'),
              thumbnailHidden: false, 
            }
          ],
          foregroundPresentationOptions:{
            badge: true,
            sound: true, 
            list: true,
            banner:true
          },
          sound:'notification.wav'
        }
      })
}

export const setCategory = async () => {
  await notifee.setNotificationCategories([
    {
      id: 'water-intake',
      actions: [
        {
          id: 'water-intake',
          title: 'Okay',
          foreground: true
        }
      ]
    },
    {
      id: 'drink-action',
      actions: [
        {
          id: 'drink-action',
          title: 'I Drank Water',
          foreground: true
        }
      ]
    }
  ])
}