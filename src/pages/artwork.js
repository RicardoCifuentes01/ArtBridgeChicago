import { informationArtwork } from "../utils/getArtwork.js"
import saveFavorites from "../utils/saveFavorites.js"
import getHash from "../utils/getHash.js"
import deleteFavorites from "../utils/deleteFavorites.js"
import filterArtwork from "../utils/filterArtwork.js"
import { informationArtist } from "../utils/getArtist.js"

const artwork = async (main, defaultArtwork = undefined) => {

    let filteredInformation = undefined

    if (defaultArtwork == undefined) {
        filteredInformation = await filterArtwork(informationArtwork())
    } else {
        filteredInformation = await filterArtwork(defaultArtwork)
    }

    const cardArtwork = document.createElement('card-artwork')
    cardArtwork.image = `https://www.artic.edu/iiif/2/${filteredInformation.image}/full/256,/0/default.jpg`
    cardArtwork.year = `${filteredInformation.year}`
    cardArtwork.title = `${filteredInformation.title}`
    cardArtwork.description = `${filteredInformation.description}`
    cardArtwork.techniques = `${filteredInformation.techniques}`.replace(/,/g, ', ')
    cardArtwork.materials = `${filteredInformation.materials}`.replace(/,/g, ', ')
    cardArtwork.sound = filteredInformation.sound
    cardArtwork.author = `${filteredInformation.author}`

    main.appendChild(cardArtwork)

    const page = getHash().page || defaultArtwork.page
    const id = getHash().id || defaultArtwork.id

    const buttonLike = await cardArtwork.children[1]

    const like = () => {
        if (localStorage.getItem(id) != null) {
            buttonLike.children[0].alt = 'buttonDislike'
            buttonLike.children[0].title = 'buttonDislike'
            buttonLike.addEventListener('click', () => {
                deleteFavorites(id)
                buttonLike.children[0].alt = 'buttonLike'
                buttonLike.children[0].title = 'buttonLike'
                like()
            })
        } else {
            buttonLike.addEventListener('click', () => {
                saveFavorites(page, id, cardArtwork.image, cardArtwork.title)
                buttonLike.children[0].alt = 'buttonDislike'
                buttonLike.children[0].title = 'buttonDislike'
                like()
            })
        }
    }

    like()

    const buttonArtist = await cardArtwork.children[7]

    buttonArtist.addEventListener('click', () => {
        location.hash = `#artist=${filteredInformation.artist_id}`
        informationArtist()
    })

    return main
}

export default artwork