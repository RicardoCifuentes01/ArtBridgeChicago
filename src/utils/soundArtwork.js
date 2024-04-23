const sound = async (id) => {
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/sounds/${id}`)
        const information = await response.json()
        return information.data.content
    } catch (error) {
        console.log(error)
    }
}

export default sound