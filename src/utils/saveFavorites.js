import getHash from "./getHash.js"

const saveFavorites = (image, title) => {

    const page = getHash().page

    const favorite = {
        page: page,
        image: image,
        title: title
    }

    localStorage.setItem(`${getHash().id}`, JSON.stringify(favorite))

}

export default saveFavorites