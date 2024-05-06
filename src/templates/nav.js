const nav = (navElement) => {
    const listPages = document.createElement('ul')

    const pages = { 'ABC': ['https://i.ibb.co/gSR7Csn/casa.png', ''], 'Search': ['https://i.ibb.co/K7LXGNr/buscar.png', '#search'], 'Store': ['https://i.ibb.co/9TF7sc1/tienda-2.png', '#store'], 'Favorites': ['https://i.ibb.co/Y73Pqwh/amor.png', '#favorites'] }

    for (const page in pages) {
        const item = document.createElement('li')

        const button = document.createElement('a')
        button.href = `${pages[page][1]}`

        const buttonFigure = document.createElement('figure')

        const buttonImg = document.createElement('img')
        buttonImg.setAttribute('src', `${pages[page][0]}`)
        buttonImg.setAttribute('title', `${page}`)
        buttonImg.setAttribute('alt', `${page}`)

        buttonFigure.appendChild(buttonImg)

        button.appendChild(buttonFigure)

        item.appendChild(button)
        listPages.appendChild(item)
    }

    navElement.appendChild(listPages)

}

export default nav