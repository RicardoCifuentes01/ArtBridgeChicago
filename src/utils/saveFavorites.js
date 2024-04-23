const saveFavorites = (page, id, image, title) => {

    const favorite = {
        page: page,
        image: image,
        title: title
    }

    localStorage.setItem(`${id}`, JSON.stringify(favorite))

}

export default saveFavorites