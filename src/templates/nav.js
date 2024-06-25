const nav = (navElement) => {
    const listPages = document.createElement('ul')

    const pages = { 'ABC': ['../src/assets/nav/home.png', ''], 'Search': ['../src/assets/nav/searchNav.png', '#search'], 'Store': ['../src/assets/nav/storeNav.png', '#store'], 'Favorites': ['../src/assets/nav/favorites.png', '#favorites'] }

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