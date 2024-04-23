import getHash from "./getHash.js"

const getArtwork = async (id) => {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=image_id,date_display,title,description,technique_titles,material_titles,sound_ids,artist_display,artist_id`)
        const information = await response.json()
        return information.data
    } catch (error) {
        console.log(error)
    }
}

export const informationArtwork = async (defaultId) => {
    if (defaultId) {
        return await getArtwork(defaultId)
    } else {
        return await getArtwork(getHash().id)
    }

}