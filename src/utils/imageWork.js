const imageWork = async (id, workCategory) => {
    const image = new Image()
    workCategory == 'artwork' ? image.src = await `https://www.artic.edu/iiif/2/${id}/full/1200,/0/default.jpg` : image.src = await `${id}`

    return image
}

export default imageWork