import sound from "./soundArtwork.js"

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
    artwork.artist_id == null ? filteredArtwork['artist_id'] = undefined : filteredArtwork['artist_id'] = artwork.artist_id
    filteredArtwork['width'] = artwork.thumbnail.width

    return filteredArtwork
}

export default filterArtwork