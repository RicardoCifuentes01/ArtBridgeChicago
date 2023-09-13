const footer = (footerElement) => {

    const description = document.createElement('p')
    description.textContent = "“Art Bridge Chicago” is not in any way profiting from the public or private works accessible through the Art Institute of Chicago's API. This platform is intended solely for educational and informational purposes. All rights to the artworks and related content belong to their respective owners."

    const sourcesTechnologies = { 'API': 'Institute Art Chicago', 'Structure and content': 'Web Components', 'Styles': 'SASS', 'Functions': 'JavaScript', 'Version control': 'Git', 'Libraries': 'NPM', 'AI-generated logos': 'Bing', 'Desing': 'Figma' }

    const listSourcesTechnologies = document.createElement('ul')

    for (const sourceTechnology in sourcesTechnologies) {

        const item = document.createElement('li')

        const title = document.createElement('p')
        title.textContent = `${sourceTechnology}`

        const sourceTechnologyFigure = document.createElement('figure')
        const sourceTechnologyImg = document.createElement('img')
        sourceTechnologyImg.setAttribute('alt', `${sourcesTechnologies[sourceTechnology]}`)
        sourceTechnologyImg.setAttribute('title', `${sourcesTechnologies[sourceTechnology]}`)
        sourceTechnologyFigure.appendChild(sourceTechnologyImg)

        item.append(sourceTechnologyFigure, title)

        listSourcesTechnologies.appendChild(item)
    }

    const information = document.createElement('div')

    const date = document.createElement('p')
    date.textContent = '2023 September'

    const author = document.createElement('a')
    author.setAttribute('href', 'https://platzi.com/p/ricardo-racm/')
    author.innerHTML = 'Ricardo Cifuentes<br><br>Portfolio and profile'

    const platziFigure = document.createElement('figure')
    const platziImg = document.createElement('img')
    platziFigure.appendChild(platziImg)
    platziImg.setAttribute('title', 'Platzi profile')
    platziImg.setAttribute('alt', 'Platzi profile')

    author.appendChild(platziFigure)

    information.append(date, author)

    footerElement.append(description, listSourcesTechnologies, information)

}

export default footer