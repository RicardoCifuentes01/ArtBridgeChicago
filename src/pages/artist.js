import { informationArtist } from "../utils/getArtist.js"
import styles from "../utils/styles.js"
import getHash from "../utils/getHash.js"
import like from "../utils/like.js"

const artist = async (main) => {

    //STYLES
    const ns = 'http://www.w3.org/2000/svg'
    main.className = 'mainArtist'
    styles('artist')

    //FILTERED INFORMATION
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

    //CARD
    const cardArtist = document.createElement('card-artist')
    cardArtist.setAttribute('class', 'cardArtist')
    cardArtist.title = `${filteredInformation.title}`
    cardArtist.isArtist = `${filteredInformation.isArtist}`
    cardArtist.birth = `${filteredInformation.birth}`
    cardArtist.death = `${filteredInformation.death}`
    cardArtist.description = `${filteredInformation.description}`

    //ARTIST
    const divArtworksSection = document.createElement('div')
    divArtworksSection.setAttribute('class', 'divArtworksSection')

    const titleDivArtworksSection = document.createElement('h2')
    titleDivArtworksSection.innerText = 'Artworks'
    titleDivArtworksSection.setAttribute('class', 'titleDivArtworksSection')

    divArtworksSection.appendChild(titleDivArtworksSection)

    //ARTWORKS
    const artworksArtistSection = document.createElement('section')
    artworksArtistSection.setAttribute('class', 'artworksArtistSection')

    const artworksArtistNavSection = document.createElement('section')
    artworksArtistNavSection.setAttribute('class', 'artworksArtistNavSection')

    const artworksArtistSectionContent = async (title, presentPage) => {

        const term = title.replace(' ', '%20')

        const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${term}&fields=id,image_id,title,date_display,artist_title&page=${presentPage}`)
        const information = await response.json()

        for (const artwork of information.data) {

            if (artwork.artist_title == filteredInformation.title) {

                const artworkDiv = document.createElement('div')
                artworkDiv.setAttribute('class', 'artworkDiv')
                const artworkFigure = document.createElement('figure')
                artworkFigure.setAttribute('class', 'artworkFigure')
                const artworkImg = document.createElement('img')
                artworkImg.setAttribute('class', 'artworkImg')
                artwork.image_id == null || artwork.image_id == '' ? artworkImg.setAttribute('src', '') : artworkImg.setAttribute('src', `https://www.artic.edu/iiif/2/${artwork.image_id}/full/256,/0/default.jpg`)


                const artworkTitle = document.createElement('h3')
                artworkTitle.setAttribute('class', 'artworkTitle')

                if (artwork.title != null || artwork.title != '') {
                    artworkImg.setAttribute('title', `${artwork.title}`)
                    artworkImg.setAttribute('alt', `${artwork.title}`)
                    artwork.title.length > 30 ? artworkTitle.textContent = `${artwork.title.slice(0, 30)}...` : artworkTitle.textContent = artwork.title
                } else {
                    artworkImg.setAttribute('title', 'Untitle')
                    artworkImg.setAttribute('alt', 'Untitle')
                    artworkTitle.textContent = 'Untitle'
                }

                const artworkDate = document.createElement('p')
                artworkDate.setAttribute('class', 'artworkDate')

                artwork.date_display == null || artwork.date_display == '' ? artworkDate.textContent = 'Unknown' : artworkDate.textContent = `${artwork.date_display}`

                artworkFigure.appendChild(artworkImg)

                artworkDiv.append(artworkFigure, artworkDate, artworkTitle)
                artworksArtistSection.appendChild(artworkDiv)

                artworkDiv.addEventListener('click', () => {
                    location.hash = `#artwork=${artwork.id}`
                })
            }

        }

        //NAV PAGE
        const artworksArtistNavContent = (numberPages) => {

            const selectPage = document.createElement('select')
            selectPage.setAttribute('title', 'Select artworks page')

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
                previousPage.setAttribute('class', 'buttonPrevious')
                previousPage.setAttribute('type', 'button')
                previousPage.setAttribute('title', 'Previous page')

                const previousFigure = document.createElement('figure')

                const previousSvg = document.createElementNS(ns, 'svg')
                previousSvg.setAttribute('viewBox', '0 0 80 100')
                previousSvg.setAttribute('width', '19')
                previousSvg.setAttribute('height', '19')
                previousSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

                const previousPath = document.createElementNS(ns, 'path')
                previousPath.setAttribute('d', 'M10 50 L50 10 L90 50')
                previousPath.setAttribute('stroke', '#64646C')
                previousPath.setAttribute('fill', 'none')
                previousPath.setAttribute('stroke-width', '10')

                previousSvg.appendChild(previousPath)
                previousFigure.appendChild(previousSvg)
                previousPage.appendChild(previousFigure)


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
                nextPage.setAttribute('class', 'buttonNext')
                nextPage.setAttribute('type', 'button')
                nextPage.setAttribute('title', 'Next page')

                const nextFigure = document.createElement('figure')

                const nextSvg = document.createElementNS(ns, 'svg')
                nextSvg.setAttribute('viewBox', '0 0 50 100')
                nextSvg.setAttribute('width', '19')
                nextSvg.setAttribute('height', '19')
                nextSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

                const nextPath = document.createElementNS(ns, 'path')
                nextPath.setAttribute('d', 'M10 10 L50 50 L10 90')
                nextPath.setAttribute('stroke', '#64646C')
                nextPath.setAttribute('fill', 'none')
                nextPath.setAttribute('stroke-width', '10')

                nextSvg.appendChild(nextPath)
                nextFigure.appendChild(nextSvg)
                nextPage.appendChild(nextFigure)


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

    divArtworksSection.append(artworksArtistSection, artworksArtistNavSection)

    main.append(cardArtist, divArtworksSection)

    //LIKE
    const buttonLike = await cardArtist.children[2]
    buttonLike.classList.add('buttoLikeArtist')

    const page = getHash().page
    const id = getHash().id

    const heart = document.getElementById('heart')
    const path = document.getElementById('pathHeart')

    like(page, id, cardArtist, buttonLike, heart, path)

    return main
}

export default artist