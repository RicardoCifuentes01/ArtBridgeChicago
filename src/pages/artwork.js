import { informationArtwork } from "../utils/getArtwork.js"
import getHash from "../utils/getHash.js"
import filterArtwork from "../utils/filterArtwork.js"
import { informationArtist } from "../utils/getArtist.js"
import styles from "../utils/styles.js"
import viewWork from "../utils/viewWork.js"
import like from "../utils/like.js"


const artwork = async (main, defaultArtwork = undefined) => {

    //STYLES
    styles('work')
    if (defaultArtwork == undefined) {
        main.className = 'mainArtwork'
    }


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
    if (defaultArtwork != undefined) {
        cardArtwork.classList.add('artworkCardHome')
    }
    cardArtwork.image = `https://www.artic.edu/iiif/2/${filteredInformation.image}/full/${filteredInformation.width},/0/default.jpg`
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
    figureWork.addEventListener('click', () => {
        window.open(`https://www.artic.edu/iiif/2/${filteredInformation.image}/full/${filteredInformation.width},/0/default.jpg`, '_blank')
    })

    //LIKE
    const page = getHash().page || defaultArtwork.page
    const id = getHash().id || defaultArtwork.id

    const buttonLike = await cardArtwork.children[1].children[0]

    const heart = document.getElementById('heart')
    const path = document.getElementById('pathHeart')

    like(page, id, cardArtwork, buttonLike, heart, path)

    //DESCRIPTION
    const descriptionRecommendedArtwork = await cardArtwork.children[1].children[3]
    if (defaultArtwork != null && descriptionRecommendedArtwork.textContent.length > 200) {
        descriptionRecommendedArtwork.textContent = `${descriptionRecommendedArtwork.textContent.slice(0, 200)} ...`

        const readMoreDescription = document.createElement('span')
        readMoreDescription.textContent = 'Read more description'
        descriptionRecommendedArtwork.appendChild(readMoreDescription)
        readMoreDescription.setAttribute('class', 'readMoreDescription')

        const readMore = () => {
            location.hash = `#artwork=${defaultArtwork.id}`
            informationArtwork()
        }

        readMoreDescription.addEventListener('click', readMore)


    }

    return main
}

export default artwork