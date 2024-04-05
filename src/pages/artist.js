import { informationArtist } from "../utils/getArtist.js"
import { informationArtwork } from "../utils/getArtwork.js"

const artist = async (main) => {

    const filterArtist = async (information) => {

        const artist = await information

        const filteredArtist = {}

        artist.title == null ? filteredArtist['title'] = 'Unknown' : filteredArtist['title'] = artist.title
        artist.isArtist == false ? filteredArtist['isArtist'] = '' : filteredArtist['isArtist'] = 'Artist'
        artist.birth_date == '' || artist.birth_date == null ? filteredArtist['birth'] = 'Unknown' : filteredArtist['birth'] = artist.birth_date
        artist.death_date == '' || artist.death_date == null ? filteredArtist['death'] = 'unknown' : filteredArtist['death'] = artist.death_date
        artist.description == null ? filteredArtist['description'] = '' : filteredArtist['description'] = artist.description

        return filteredArtist
    }

    const filteredInformation = await filterArtist(informationArtist())

    const cardArtist = document.createElement('card-artist')
    cardArtist.title = `${filteredInformation.title}`
    cardArtist.isArtist = `${filteredInformation.isArtist}`
    cardArtist.birth = `${filteredInformation.birth}`
    cardArtist.death = `${filteredInformation.death}`
    cardArtist.description = `${filteredInformation.description}`

    const artworksArtistSection = document.createElement('section')

    const artworksArtistNavSection = document.createElement('section')

    const artworksArtistSectionContent = async (title, presentPage) => {

        const term = title.replace(' ', '%20')

        const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${term}&fields=id,image_id,title,date_display,artist_title&page=${presentPage}`)
        const information = await response.json()

        for (const artwork of information.data) {

            if (artwork.artist_title == filteredInformation.title) {

                const artworkDiv = document.createElement('div')
                const artworkFigure = document.createElement('figure')
                const artworkImg = document.createElement('img')
                artwork.image_id == null || artwork.image_id == '' ? artworkImg.setAttribute('src', '') : artworkImg.setAttribute('src', `https://www.artic.edu/iiif/2/${artwork.image_id}/full/256,/0/default.jpg`)


                const artworkTitle = document.createElement('h3')

                if (artwork.title != null || artwork.title != '') {
                    artworkImg.setAttribute('title', `${artwork.title}`)
                    artworkImg.setAttribute('alt', `${artwork.title}`)
                    artworkTitle.textContent = `${artwork.title}`
                } else {
                    artworkImg.setAttribute('title', 'Untitle')
                    artworkImg.setAttribute('alt', 'Untitle')
                    artworkTitle.textContent = 'Untitle'
                }

                const artworkDate = document.createElement('p')

                artwork.date_display == null || artwork.date_display == '' ? artworkDate.textContent = 'Unknown' : artworkDate.textContent = `${artwork.date_display}`

                artworkFigure.appendChild(artworkImg)

                artworkDiv.append(artworkFigure, artworkDate, artworkTitle)
                artworksArtistSection.appendChild(artworkDiv)

                artworkDiv.addEventListener('click', () => {
                    location.hash = `#artwork=${artwork.id}`
                    informationArtwork(artwork.id)
                })
            }

        }

        const artworksArtistNavContent = (numberPages) => {



            const selectPage = document.createElement('select')

            for (let index = 1; index <= numberPages; index++) {
                const optionPage = document.createElement('option')
                optionPage.setAttribute('value', index)
                optionPage.textContent = index

                selectPage.appendChild(optionPage)

                if (optionPage.textContent == presentPage) { optionPage.setAttribute('selected', '') }
            }

            selectPage.addEventListener('change', function () {
                artworksArtistSection.innerHTML = ''
                artworksArtistNavSection.innerHTML = ''
                artworksArtistSectionContent(title, Number(this.value))
            })

            if (presentPage != 1) {
                const previousPage = document.createElement('button')
                previousPage.textContent = 'previous'

                const previousFigure = document.createElement('figure')
                const previousImg = document.createElement('img')
                previousFigure.appendChild(previousImg)
                previousImg.setAttribute('alt', 'Previous page')
                previousImg.setAttribute('title', 'Previous page')

                previousPage.addEventListener('click', function () {
                    presentPage = presentPage - 1
                    artworksArtistSection.innerHTML = ''
                    artworksArtistNavSection.innerHTML = ''
                    artworksArtistSectionContent(title, presentPage)
                })

                artworksArtistNavSection.appendChild(previousPage)

            }

            artworksArtistNavSection.appendChild(selectPage)

            if (presentPage != numberPages) {
                const nextPage = document.createElement('button')
                nextPage.textContent = 'next'
                const nextFigure = document.createElement('figure')
                const nextImg = document.createElement('img')
                nextFigure.appendChild(nextImg)
                nextImg.setAttribute('alt', 'Next page')
                nextImg.setAttribute('title', 'Next page')

                nextPage.addEventListener('click', function () {
                    presentPage = presentPage + 1
                    artworksArtistSection.innerHTML = ''
                    artworksArtistNavSection.innerHTML = ''
                    artworksArtistSectionContent(title, presentPage)
                })

                artworksArtistNavSection.appendChild(nextPage)
            }
        }

        let working = true
        let page = 1

        while (working) {

            const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${term}&fields=image_id,title,date_display,artist_title&page=${page}`)
            const information = await response.json()

            const artistsTitlesPage = []

            for (const artwork of information.data) {
                artistsTitlesPage.push(artwork.artist_title)
            }

            working = artistsTitlesPage.includes(title)

            if (working) {
                page = page + 1
            }
        }

        if (!working) {
            const numberPages = page - 1
            artworksArtistNavContent(numberPages)
        }

    }

    artworksArtistSectionContent(filteredInformation.title, 1)

    main.append(cardArtist, artworksArtistSection, artworksArtistNavSection)

    return main
}

export default artist