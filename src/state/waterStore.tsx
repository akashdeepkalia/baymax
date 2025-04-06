import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { mmkvStorage } from "./Storage"


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
            },
            resetWaterIntake : () => {
                set({waterDrinkStamps:[]})
            }
        }),
        {
            name: 'waterStore',
            storage: createJSONStorage(()=>mmkvStorage)
        }
    )
) 