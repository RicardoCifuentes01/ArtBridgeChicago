const footer = (footerElement) => {

    const description = document.createElement('p')
    description.textContent = "“Art Bridge Chicago” is not in any way profiting from the public or private works accessible through the Art Institute of Chicago's API. This platform is intended solely for educational and informational purposes. All rights to the artworks and related content belong to their respective owners."

    const sourcesTechnologies = { 'API': ['https://i.ibb.co/YPKszr9/image-38.png', 'Institute Art Chicago'], 'Structure and content': ['https://i.ibb.co/HT7JTx5/image-31.png', 'Web Components'], 'Styles': ['https://i.ibb.co/3CTPYXj/image-32.png', 'SASS'], 'Functions': ['https://i.ibb.co/tMQGryJ/image-33.png', 'JavaScript'], 'Version control': ['https://i.ibb.co/T2ZvTjV/image-34.png', 'Git'], 'Libraries': ['https://i.ibb.co/Hg4v4Tw/npm-logo.png', 'NPM'], 'AI-generated logos': ['https://i.ibb.co/jTPG6V7/image-36.png', 'Bing'], 'Desing': ['https://i.ibb.co/YZNC7w4/Figma-Logo-PNG-Image.png', 'Figma'] }

    const listSourcesTechnologies = document.createElement('ul')

    for (const sourceTechnology in sourcesTechnologies) {

        const item = document.createElement('li')

        const title = document.createElement('p')
        title.textContent = `${sourceTechnology}`

        const sourceTechnologyFigure = document.createElement('figure')
        const sourceTechnologyImg = document.createElement('img')
        sourceTechnologyImg.setAttribute('src', `${sourcesTechnologies[sourceTechnology][0]}`)
        sourceTechnologyImg.setAttribute('alt', `${sourcesTechnologies[sourceTechnology][1]}`)
        sourceTechnologyImg.setAttribute('title', `${sourcesTechnologies[sourceTechnology][1]}`)
        sourceTechnologyFigure.appendChild(sourceTechnologyImg)

        item.append(sourceTechnologyFigure, title)

        listSourcesTechnologies.appendChild(item)
    }

    const information = document.createElement('div')
    information.className = 'footer__information'

    const date = document.createElement('p')
    date.textContent = '2023 September'

    const author = document.createElement('a')
    author.setAttribute('href', 'https://platzi.com/p/ricardo-racm/')
    author.innerHTML = '<p>Ricardo Cifuentes<br>Portfolio and profile</p>'

    const platziFigure = document.createElement('figure')
    const platziImg = document.createElement('img')
    platziFigure.appendChild(platziImg)
    platziImg.setAttribute('src', 'https://i.ibb.co/DYdhyGW/platzi.png')
    platziImg.setAttribute('title', 'Platzi profile')
    platziImg.setAttribute('alt', 'Platzi profile')

    author.appendChild(platziFigure)

    information.append(date, author)

    footerElement.append(description, listSourcesTechnologies, information)

}

export default footer