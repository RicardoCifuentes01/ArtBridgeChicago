import getHash from "../utils/getHash.js"

const error = (main) => {

    const page = getHash().page.slice(1)

    const titleError = document.createElement('h1')
    titleError.textContent = 'ERROR'

    const figureError = document.createElement('figure')
    const imgError = document.createElement('img')
    imgError.title = `Error about the ${page} search`
    imgError.alt = `Error about the ${page} search`
    figureError.appendChild(imgError)

    const descriptionError = document.createElement('p')
    descriptionError.textContent = `The "${page}" page does not exist with the identifier: ${getHash().id}. Please make a new query with another page and/or identifier.`


    main.append(titleError, figureError, descriptionError)

}

export default error