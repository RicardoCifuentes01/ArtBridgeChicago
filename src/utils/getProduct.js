import getHash from "./getHash.js"

const getProduct = async (id) => {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/products/${id}?fields=image_url,title,max_current_price,web_url,description`)
        const information = await response.json()
        return information.data
    } catch (error) {
        console.log(error)
    }
}

export const informationProduct = async () => {
    return await getProduct(getHash().id)
}