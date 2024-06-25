import getAllArtworks from "./getAllArtworks.js"

const getArtworkRandom = async () => {
    try {
        const informationGeneral = await getAllArtworks()
        const pages = informationGeneral.pagination.total_pages
        const artworks = informationGeneral.pagination.limit
        const randomPage = Math.floor(Math.random() * (pages - 1) + 1)
        const randomArtwork = Math.floor(Math.random() * (artworks - 1) + 1)
        const response = await fetch(`https://api.artic.edu/api/v1/artworks?fields=id,image_id,date_display,title&page=${randomPage}`)
        const information = await response.json()
        const artwork = information.data[randomArtwork]
        return artwork
    } catch (error) {
        console.log(error)
    }
}

export default getArtworkRandom