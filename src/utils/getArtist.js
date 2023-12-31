import getHash from "./getHash.js"

const getArtist = async (id) => {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/agents/${id}?fields=title,is_artist,birth_date,death_date,description`)
        const information = await response.json()
        return information.data
    } catch (error) {
        console.log(error)
    }
}

export const informationArtist = async () => {
    return await getArtist(getHash().id)
}