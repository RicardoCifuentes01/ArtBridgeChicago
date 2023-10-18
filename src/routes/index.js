import header from "../templates/header.js"
import nav from "../templates/nav.js"
import footer from "../templates/footer.js"
import home from "../pages/home.js"
import artwork from "../pages/artwork.js"
import artist from "../pages/artist.js"
import cardArtwork from "../components/cardArtwork.js"
import store from "../pages/store.js"
import product from "../pages/product.js"
import favorites from "../pages/favorites.js"
import search from "../pages/search.js"
import error from "../pages/error.js"
import getHash from "../utils/getHash.js"
import resolveRoutes from "../utils/resolveRoutes.js"
import cardArtist from "../components/cardArtist.js"
import cardProduct from "../components/cardProduct.js"

cardArtwork()
cardArtist()
cardProduct()

const routes = { '': home, 'artwork': artwork, 'artist': artist, 'store': store, 'product': product, 'favorites': favorites, 'search': search }

export const router = () => {
    const headerElement = document.querySelector('header')
    headerElement.innerHTML = ''
    header(headerElement)

    const mainElement = document.querySelector('main')
    mainElement.innerHTML = ''

    const navElement = document.querySelector('nav')
    navElement.innerHTML = ''
    nav(navElement)

    const footerElement = document.querySelector('footer')
    footerElement.innerHTML = ''
    footer(footerElement)

    const hash = getHash().page
    const resolve = resolveRoutes(hash)
    const render = routes[resolve] ? routes[resolve] : error
    render(mainElement)
}