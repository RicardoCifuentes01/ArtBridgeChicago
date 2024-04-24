import getHash from "./getHash.js"
import error from "../pages/error.js";

const getProduct = async (id) => {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/products/${id}?fields=image_url,title,max_current_price,web_url,description`)
        if (!response.ok || id == '') {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const information = await response.json()
        return information.data
    } catch (ERROR) {
        const mainElement = document.querySelector('main')
        return await error(mainElement)
    }
}

export const informationProduct = async () => {
    return await getProduct(getHash().id)
}