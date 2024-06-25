import getHash from "../utils/getHash.js"
import styles from "../utils/styles.js"

const error = (main) => {

    //STYLES
    styles('error')
    main.className = 'mainError'

    const page = getHash().page.slice(1)

    //ERROR
    const titleError = document.createElement('h1')
    titleError.setAttribute('class', 'titleError')
    titleError.textContent = 'ERROR'

    const figureError = document.createElement('figure')
    figureError.setAttribute('class', 'figureError')
    const imgError = document.createElement('img')
    imgError.title = `Error about the ${page} search`
    imgError.alt = `Error about the ${page} search`
    imgError.src = '../src/assets/error/pageError.png'
    figureError.appendChild(imgError)

    const descriptionError = document.createElement('p')
    descriptionError.setAttribute('class', 'descriptionError')
    descriptionError.textContent = `The "${page}" page does not exist with the identifier: ${getHash().id}. Please make a new query with another page and/or identifier.`


    main.append(figureError, titleError, descriptionError)

}

export default error