import { usePedometerStore } from '../state/pedometerStore';
import { useWaterStore } from '../state/waterStore';
import { createTimestampNotification } from './notificationUtils';
import notifee from '@notifee/react-native'

const INTERVAL_NOTIFICATION_ID = 'water-reminder'

const createHourlyReminder = async () => {
    const startHour = 9;
    const endHour = 23;
    const interval = 2;
    let counter = 1;
    for(let hour = startHour; hour <= endHour; hour += interval){
        await createTimestampNotification(
            require('../assets/images/water.png'),
            "Water Reminder 💧",
            "Time to drink some water",
            hour,
            0,
            `${INTERVAL_NOTIFICATION_ID} - ${counter}`
        )
        counter ++
    }
}

export const registerAllTriggers = async () => {

  const { waterDrinkStamps, resetWaterIntake } = useWaterStore.getState();
  const { initializeStepsForTheDay } = usePedometerStore.getState();
  initializeStepsForTheDay();

  //GOOD MORNING
  createTimestampNotification(
    require('../assets/images/gm.png'),
    "Good Morning 🌞🌻",
    "Start your day with positivity",
    6,
    0,
    'good-morning'
  )

  
  //GOOD NIGHT
  createTimestampNotification(
    require('../assets/images/gn.png'),
    "Good Night 🌙😴",
    "End your day with peace and relax",
    16,
    23,
    'good-night'
  )

   //WALKING REMINDER - MORNING
   createTimestampNotification(
    require('../assets/images/run.png'),
    "Healthy Walking",
    "Take a step today 🏃‍♂️",
    7,
    0,
    'daily-walking-morning'
  )

   //WALKING REMINDER - EVENING
   createTimestampNotification(
    require('../assets/images/run.png'),
    "Healthy Walking",
    "Take a step today 🏃‍♂️",
    18,
    0,
    'daily-walking-morning'
  )

  // WATER REMINDERS
  if(waterDrinkStamps.length != 8){
    await createHourlyReminder()
  }
  else{
    const notifications = await notifee.getTriggerNotifications()
    let counter = 1
    for (const notification of notifications) {
        if(notification.notification.id === `${INTERVAL_NOTIFICATION_ID} - ${counter}`){
            await notifee.cancelNotification(notification.notification.id)
        }
        counter++;
    }
  }

  // RESET WATER INTAKES EVERY DAY WHEN APP OPENS
  const now = new Date()
  const currentDate = now.toISOString().split('T')[0]
  
  const isFromPrevioiusDay = (timestamps: string[]) =>{
    if(timestamps.length === 0) return true;
    const lastTimeStamp = new Date(timestamps[timestamps.length - 1])
    const lastDate = lastTimeStamp.toISOString().split('T')[0]
    return lastDate != currentDate
  }

  if(isFromPrevioiusDay(waterDrinkStamps)){
    resetWaterIntake()
  }
};
