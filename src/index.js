import { router } from "./routes/index.js";
import loadingScreen from "./utils/loadingScreen.js"

window.addEventListener('load', () => {

    loadingScreen()
    router()

})
window.addEventListener('hashchange', () => {
    loadingScreen()
    router()
})