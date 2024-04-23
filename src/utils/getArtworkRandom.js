import randomId from "./randomId.js"

const getArtworkRandom = async (id) => {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=id,image_id,date_display,title`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const information = await response.json()
        return information.data
    } catch (error) {
        return await getArtworkRandom(randomId())
    }
}

export const informationArtworkRandom = async () => {
    return await getArtworkRandom(randomId())
}