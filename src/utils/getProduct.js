const getProduct = async (id) => {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/products/${id}?fields=image_url,title,max_current_price,web_url,description`)
        const information = await response.json()
        return information.data
    } catch (error) {
        console.log(error)
    }
}

export const information = getProduct(289074) //Test