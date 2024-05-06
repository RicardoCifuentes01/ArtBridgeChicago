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

    const search = document.createElement('div')

    const searchField = document.createElement('input')
    searchField.setAttribute('type', 'text')
    searchField.setAttribute('id', 'term')
    searchField.setAttribute('name', 'term')
    searchField.setAttribute('placeholder', 'Search...')

    const buttonSearch = document.createElement('button')
    const searchFigure = document.createElement('figure')
    const searchImg = document.createElement('img')
    searchImg.setAttribute('src', 'https://i.ibb.co/3MZ5TTN/buscar-4.png')
    searchImg.setAttribute('alt', 'search')
    searchImg.setAttribute('title', 'search')
    searchFigure.appendChild(searchImg)
    buttonSearch.appendChild(searchFigure)

    buttonSearch.addEventListener('click', (event) => {
        searchField.value != '' && searchField.value != ' ' && searchField.value != '%20' ? location.hash = `#search=${searchField.value}` : event.preventDefault()
    })

    search.append(searchField, buttonSearch)

    headerElement.append(listPages, search)
}

export default header