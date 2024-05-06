import { informationArtwork } from "../utils/getArtwork.js"
import getHash from "../utils/getHash.js"
import filterArtwork from "../utils/filterArtwork.js"
import { informationArtist } from "../utils/getArtist.js"
import styles from "../utils/styles.js"
import zoomWork from "../utils/zoomWork.js"
import zoomWorkStyles from "../utils/zoomWorkStyles.js"
import closeZoom from "../utils/closeZoom.js"
import viewWork from "../utils/viewWork.js"
import like from "../utils/like.js"


const artwork = async (main, defaultArtwork = undefined) => {

    //STYLES
    styles('work').appendChild(await zoomWorkStyles())

    //FILTERED INFORMATION
    let filteredInformation = undefined

    if (defaultArtwork == undefined) {
        filteredInformation = await filterArtwork(informationArtwork())
    } else {
        filteredInformation = await filterArtwork(defaultArtwork)
    }

    //CARD
    const cardArtwork = document.createElement('card-artwork')
    cardArtwork.className = 'card'
    cardArtwork.image = `https://www.artic.edu/iiif/2/${filteredInformation.image}/full/1700,/0/default.jpg`
    cardArtwork.year = `${filteredInformation.year}`
    cardArtwork.title = `${filteredInformation.title}`
    cardArtwork.description = `${filteredInformation.description}`
    cardArtwork.techniques = `${filteredInformation.techniques}`.replace(/,/g, ', ')
    cardArtwork.materials = `${filteredInformation.materials}`.replace(/,/g, ', ')
    cardArtwork.sound = filteredInformation.sound
    cardArtwork.author = `${filteredInformation.author}`

    main.appendChild(cardArtwork)

    //ARTIST
    let buttonArtist = undefined
    filteredInformation.sound == null ? buttonArtist = await cardArtwork.children[1].children[6] : buttonArtist = await cardArtwork.children[1].children[7]

    buttonArtist.addEventListener('click', () => {
        location.hash = `#artist=${filteredInformation.artist_id}`
        informationArtist()
    })


    //VIEW WORK
    await viewWork(filteredInformation.image, 'artwork')

    //ZOOM
    const figureWork = await cardArtwork.children[0]

    let statusZoom = false

    figureWork.addEventListener('click', async () => {
        if (!statusZoom) {

            statusZoom = true

            const figureCloseZoom = await zoomWork(filteredInformation.image, 'artwork', cardArtwork, figureWork)

            figureCloseZoom.addEventListener('click', async () => {
                statusZoom = await closeZoom(filteredInformation.image, 'artwork', cardArtwork, figureWork)
            })
        }
    })

    //LIKE
    const page = getHash().page || defaultArtwork.page
    const id = getHash().id || defaultArtwork.id

    const buttonLike = await cardArtwork.children[1].children[0]

    const heart = document.getElementById('heart')
    const path = document.getElementById('pathHeart')

    like(page, id, cardArtwork, buttonLike, heart, path)

    return main
}

export default artwork