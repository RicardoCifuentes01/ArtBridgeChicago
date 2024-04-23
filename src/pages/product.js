import { informationProduct } from "../utils/getProduct.js"
import saveFavorites from "../utils/saveFavorites.js"
import getHash from "../utils/getHash.js"
import deleteFavorites from "../utils/deleteFavorites.js"

const product = async (main) => {
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

    const cardProduct = document.createElement('card-product')
    cardProduct.image = `${filteredInformation.image}`
    cardProduct.title = `${filteredInformation.title}`
    cardProduct.price = `${filteredInformation.price}`
    cardProduct.urlWeb = `${filteredInformation.urlWeb}`
    cardProduct.description = `${filteredInformation.description}`

    main.appendChild(cardProduct)

    const buttonLike = cardProduct.children[1]

    const like = () => {
        if (localStorage.getItem(getHash().id) != null) {
            buttonLike.children[0].alt = 'buttonDislike'
            buttonLike.children[0].title = 'buttonDislike'
            buttonLike.addEventListener('click', () => {
                deleteFavorites(getHash().id)
                buttonLike.children[0].alt = 'buttonLike'
                buttonLike.children[0].title = 'buttonLike'
                like()
            })
        } else {
            buttonLike.addEventListener('click', () => {
                saveFavorites(getHash().page, getHash().id, cardProduct.image, cardProduct.title)
                buttonLike.children[0].alt = 'buttonDislike'
                buttonLike.children[0].title = 'buttonDislike'
                like()
            })
        }
    }

    like()
}

export default product