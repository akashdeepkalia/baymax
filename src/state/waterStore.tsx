import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { mmkvStorage } from "./Storage"
import { displayNotification } from "../notification/notificationInitial"


interface WaterSotre {
    waterDrinkStamps : string[],
    addWaterIntake : (timestamp : string) => void,
    resetWaterIntake : () => void
}

export const useWaterStore = create<WaterSotre>()(
    persist(
        (set, get)=>({
            waterDrinkStamps : [], 
            addWaterIntake : (timestamp) => {
                const waterDrinkStamps = [...get().waterDrinkStamps, timestamp]
                set({waterDrinkStamps})

                // checking notification is working
                displayNotification(
                    `Water intake ${waterDrinkStamps.length}/8`,
                    'Stay Hydrated',
                    require("../assets/images/water.png"),
                    'water-intake'
                )
            },
            resetWaterIntake : () => {
                set({waterDrinkStamps:[]})
            }
        }),
        {
            name: 'pedometer-storage',
            storage: createJSONStorage(()=>mmkvStorage)
        }
    )
) 