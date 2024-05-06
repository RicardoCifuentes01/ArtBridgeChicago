import getHash from "./getHash.js"
import error from "../pages/error.js";

const getArtist = async (id) => {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/agents/${id}?fields=title,is_artist,birth_date,death_date,description`, {
            method: 'GET',
            mode: 'cors',
        })
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

export const informationArtist = async () => {
    return await getArtist(getHash().id)
}