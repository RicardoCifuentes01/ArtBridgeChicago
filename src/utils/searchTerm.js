const searchTerm = async (term) => {
    try {
        const responseArtwork = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${term}&fields=id,image_id,date_display,title`)
        const responseArtist = await fetch(`https://api.artic.edu/api/v1/agents/search?q=${term}&fields=id,title`)
        const informationArtwork = await responseArtwork.json()
        const informationArtist = await responseArtist.json()
        const information = { artists: informationArtist.data, artworks: informationArtwork.data }
        return information
    } catch (error) {
        console.log(error)
    }
}

export default searchTerm