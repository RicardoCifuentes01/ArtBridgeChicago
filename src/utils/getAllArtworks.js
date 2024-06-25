const getAllArtworks = async () => {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks?fields=id,image_id,title`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const information = await response.json()
        return information
    } catch (error) {
        console.log(error)
    }
}

export default getAllArtworks