import observer from "../utils/intersectionObserver.js"

const footer = (footerElement) => {

    const description = document.createElement('p')
    description.textContent = "“Art Bridge Chicago” is not in any way profiting from the public or private works accessible through the Art Institute of Chicago's API. This platform is intended solely for educational and informational purposes. All rights to the artworks and related content belong to their respective owners."

    const sourcesTechnologies = { 'API': ['../src/assets/footer/AIC.png', 'Institute Art Chicago'], 'Structure and content': ['../src/assets/footer/html.png', 'Web Components'], 'Styles': ['../src/assets/footer/sass.png', 'SASS'], 'Functions': ['../src/assets/footer/js.png', 'JavaScript'], 'Version control': ['../src/assets/footer/github.png', 'Git'], 'AI-generated logos': ['../src/assets/footer/copilot.png', 'Bing'], 'Desing': ['../src/assets/footer/figma.png', 'Figma'] }

    const listSourcesTechnologies = document.createElement('ul')

    for (const sourceTechnology in sourcesTechnologies) {

        const item = document.createElement('li')

        const title = document.createElement('p')
        title.textContent = `${sourceTechnology}`

        const sourceTechnologyFigure = document.createElement('figure')
        const sourceTechnologyImg = document.createElement('img')
        sourceTechnologyImg.setAttribute('data-img', `${sourcesTechnologies[sourceTechnology][0]}`)
        sourceTechnologyImg.setAttribute('alt', `${sourcesTechnologies[sourceTechnology][1]}`)
        sourceTechnologyImg.setAttribute('title', `${sourcesTechnologies[sourceTechnology][1]}`)
        sourceTechnologyFigure.appendChild(sourceTechnologyImg)
        observer.observe(sourceTechnologyImg)

        item.append(sourceTechnologyFigure, title)

        listSourcesTechnologies.appendChild(item)
    }

    const information = document.createElement('div')
    information.className = 'footer__information'

    const date = document.createElement('p')
    date.textContent = '2024 June'

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