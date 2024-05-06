import { informationProduct } from "../utils/getProduct.js"
import saveFavorites from "../utils/saveFavorites.js"
import getHash from "../utils/getHash.js"
import deleteFavorites from "../utils/deleteFavorites.js"
import styles from "../utils/styles.js"
import zoomWork from "../utils/zoomWork.js"
import zoomWorkStyles from "../utils/zoomWorkStyles.js"
import closeZoom from "../utils/closeZoom.js"
import viewWork from "../utils/viewWork.js"


const product = async (main) => {

    //STYLES
    styles('work').appendChild(await zoomWorkStyles())

    //FILTERED INFORMATION
    const filterProduct = async (information) => {

        const product = await information

        const filteredProduct = {}

        product.image_url == null ? filteredProduct['image'] = '' : filteredProduct['image'] = product.image_url
        product.title == null || product.title == '' ? filterProduct['title'] = 'Untitle' : filteredProduct['title'] = product.title
        product.max_current_price == null || product.max_current_price == '' ? filteredProduct['price'] = 'Unknown price' : filteredProduct['price'] = product.max_current_price
        product.web_url == null || product.web_url == '' || product.web_url == undefined ? filteredProduct = null : filteredProduct['urlWeb'] = product.web_url
        product.description == null || product.description == undefined ? filteredProduct['description'] = '' : filteredProduct['description'] = product.description


        return filteredProduct
    }

    const filteredInformation = await filterProduct(informationProduct())

    //CARD
    const cardProduct = document.createElement('card-product')
    cardProduct.className = 'card'
    cardProduct.image = `${filteredInformation.image}`
    cardProduct.title = `${filteredInformation.title}`
    cardProduct.price = `${filteredInformation.price}`
    cardProduct.urlWeb = `${filteredInformation.urlWeb}`
    cardProduct.description = `${filteredInformation.description}`

    main.appendChild(cardProduct)

    //VIEW WORK
    viewWork(filteredInformation.image, 'product')

    //LIKE
    const page = getHash().page
    const id = getHash().id

    const buttonLike = cardProduct.children[1].children[0]

    const heart = document.getElementById('heart')
    const path = document.getElementById('pathHeart')

    const like = (page, id, card, button, heart, path) => {
        if (localStorage.getItem(id) != null) {
            setTimeout(() => { heart.classList.add('svgFillProduct') }, 700)
            button.children[0].alt = 'buttonDislike'
            button.children[0].title = 'buttonDislike'

            button.addEventListener('click', () => {
                deleteFavorites(id)
                heart.classList.remove('likeProduct')
                path.classList.remove('likeProduct')
                heart.classList.add('dislikeProduct')
                path.classList.add('dislikeProduct')
                setTimeout(() => { heart.classList.remove('svgFillProduct') }, 700)
                button.children[0].alt = 'buttonLike'
                button.children[0].title = 'buttonLike'
                like(page, id, card, button, heart, path)
            })
        } else {
            button.addEventListener('click', () => {
                saveFavorites(page, id, card.image, card.title)
                heart.classList.remove('dislikeProduct')
                path.classList.remove('dislikeProduct')
                heart.classList.add('likeProduct')
                path.classList.add('likeProduct')
                setTimeout(() => { heart.classList.add('svgFillProduct') }, 700)
                button.children[0].alt = 'buttonDislike'
                button.children[0].title = 'buttonDislike'
                like(page, id, card, button, heart, path)
            })
        }
    }

    like(page, id, cardProduct, buttonLike, heart, path)

    //ZOOM
    const figureWork = await cardProduct.children[0]

    let statusZoom = false

    figureWork.addEventListener('click', async () => {
        if (!statusZoom) {

            statusZoom = true

            const figureCloseZoom = await zoomWork(filteredInformation.image, 'product', cardProduct, figureWork)

            figureCloseZoom.addEventListener('click', async () => {
                statusZoom = await closeZoom(filteredInformation.image, 'product', cardProduct, figureWork)
            })
        }
    })

}

export default product