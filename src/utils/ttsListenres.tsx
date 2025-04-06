import Tts from "react-native-tts"

export const initializingTtsListener = async () => {
    Tts.getInitStatus().then((status) => {
        console.log(status)
        console.log("All Done TTS ✔")
},
(err)=>{
    if (err.code === 'no_engine') {
        Tts.requestInstallEngine()
    }
})

Tts.voices().then(voices => console.log(voices));

// Setting New Voice
Tts.setDefaultVoice('en-in-x-end-local')

Tts.setDefaultRate(0.6, true);
Tts.setIgnoreSilentSwitch("ignore");

Tts.addEventListener('tts-start', (event) => console.log("start", event));
Tts.addEventListener('tts-progress', (event) => {
    // console.log("progress", event)
});
Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));

Tts.engines().then(engines => console.log("engines", engines));
}




export const playTTS = async (message: string) => {
    Tts.getInitStatus().then((status) => {
        console.log(status)
        console.log("All Done TTS ✔")
},
(err)=>{
    if (err.code === 'no_engine') {
        Tts.requestInstallEngine()
    }
})

    Tts.speak(message)
}