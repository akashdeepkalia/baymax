import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage, storage } from "./Storage";


interface PedometerStore {
    stepCount: number;
    dailyGoal: number;
    distance: string;
    startDate: string;
    addSteps: (steps:number, distance:string) => void;
    initializeStepsForTheDay: () => void;
    resetSteps: () => void;
    setDailyGoal: (goal:number) => void;
}

export const usePedometerStore = create<PedometerStore>()(
    persist(
        (set, get) =>({
            stepCount: 0,
            dailyGoal: 2000,
            distance: '',
            startDate: new Date().toISOString().split('T')[0],
            initializeStepsForTheDay: () => {
                const todayDate = new Date().toISOString().split('T')[0]
                const {startDate} = get()
                if( todayDate !== startDate ){
                    set({startDate: todayDate, stepCount: 0, distance: ''})
                }
            },
            addSteps: (steps, distance) => {
                get().initializeStepsForTheDay()
                set((state)=>({
                    stepCount: state.stepCount + steps,
                    distance:  distance,
                }))
            },
            resetSteps: () => set({stepCount: 0}),
            setDailyGoal: (goal) => set({dailyGoal: goal}),
        }),
        {
            name: 'PedometerStore',
            storage: createJSONStorage(()=>mmkvStorage)
        }
    )
)