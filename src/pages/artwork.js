import { informationArtwork } from "../utils/getArtwork.js"

const artwork = async (main) => {

    const sound = async (id) => {
        try {
            const response = await fetch(`https://api.artic.edu/api/v1/sounds/${id}`)
            const information = await response.json()
            return information.data.content
        } catch (error) {
            console.log(error)
        }
    }

    const filterArtwork = async (information) => {

        const artwork = await information

        const filteredArtwork = {}

        artwork.image_id == null ? filteredArtwork['image'] = '' : filteredArtwork['image'] = artwork.image_id
        artwork.date_display == '' || artwork.date_display == null ? filteredArtwork['year'] = 'Unknown' : filteredArtwork['year'] = artwork.date_display
        artwork.title == '' || artwork.title == null ? filteredArtwork['title'] = 'Untitled' : filteredArtwork['title'] = artwork.title
        artwork.description == null ? filteredArtwork['description'] = '' : filteredArtwork['description'] = artwork.description
        artwork.technique_titles.length == 0 ? filteredArtwork['techniques'] = 'Unknown' : filteredArtwork['techniques'] = artwork.technique_titles
        artwork.material_titles.length == 0 ? filteredArtwork['materials'] = 'Unknown' : filteredArtwork['materials'] = artwork.material_titles
        if (artwork.sound_ids.length == 0) { filteredArtwork['sound'] = null } else { filteredArtwork['sound'] = await sound(artwork.sound_ids[0]) }
        artwork.artist_display == null ? filteredArtwork['author'] = 'Unknown' : filteredArtwork['author'] = artwork.artist_display
        return filteredArtwork
    }

    const filteredInformation = await filterArtwork(informationArtwork())

    const cardArtwork = document.createElement('card-artwork')
    cardArtwork.image = `https://www.artic.edu/iiif/2/${filteredInformation.image}/full/256,/0/default.jpg`
    cardArtwork.year = `${filteredInformation.year}`
    cardArtwork.title = `${filteredInformation.title}`
    cardArtwork.description = `${filteredInformation.description}`
    cardArtwork.techniques = `${filteredInformation.techniques}`
    cardArtwork.materials = `${filteredInformation.materials}`
    cardArtwork.sound = `${filteredInformation.sound}`
    cardArtwork.author = `${filteredInformation.author}`

    main.appendChild(cardArtwork)

    return main
}

export default artwork