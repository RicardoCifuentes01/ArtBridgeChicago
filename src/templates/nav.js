const nav = (navElement) => {
    const listPages = document.createElement('ul')

    const pages = { 'ABC': '', 'Store': '#store', 'Favorites': '#favorites', 'Search': '#search' }

    for (const page in pages) {
        const item = document.createElement('li')

        const button = document.createElement('a')
        button.href = `${pages[page]}`

        const buttonFigure = document.createElement('figure')

        const buttonImg = document.createElement('img')
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