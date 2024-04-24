import getHash from "./getHash.js"
import error from "../pages/error.js";

const getArtwork = async (id) => {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=image_id,date_display,title,description,technique_titles,material_titles,sound_ids,artist_display,artist_id`)
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

export const informationArtwork = async (defaultId) => {
    if (defaultId) {
        return await getArtwork(defaultId)
    } else {
        return await getArtwork(getHash().id)
    }

}