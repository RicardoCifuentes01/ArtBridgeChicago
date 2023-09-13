const header = (headerElement) => {
    const listPages = document.createElement('ul')

    const pages = { 'ABC': '', 'Store': '#store', 'Favorites': '#favorites' }

    for (const page in pages) {
        const item = document.createElement('li')
        const button = document.createElement('a')
        button.textContent = `${page}`
        button.href = `${pages[page]}`

        item.appendChild(button)
        listPages.appendChild(item)
    }

    const form = document.createElement('form')

    const search = document.createElement('input')
    search.setAttribute('type', 'text')
    search.setAttribute('id', 'term')
    search.setAttribute('name', 'term')
    search.setAttribute('placeholder', 'Search...')

    const buttonSearch = document.createElement('button')
    buttonSearch.setAttribute('type', 'submit')
    const searchFigure = document.createElement('figure')
    const searchImg = document.createElement('img')
    searchFigure.appendChild(searchImg)
    buttonSearch.appendChild(searchFigure)

    form.append(search, buttonSearch)

    headerElement.append(listPages, form)
}

export default header