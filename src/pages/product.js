import { informationProduct } from "../utils/getProduct.js"

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
}

export default product