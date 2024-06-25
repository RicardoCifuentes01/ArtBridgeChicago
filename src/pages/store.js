import { informationProduct } from "../utils/getProduct.js"
import styles from "../utils/styles.js"
import observer from "../utils/intersectionObserver.js"

const store = async (main, preShop = false) => {

    //STYLES
    const ns = 'http://www.w3.org/2000/svg'
    main.className = 'mainStore'
    styles('store')

    //STORE
    const storeContent = async (presentPage) => {
        const getStore = async () => {
            try {
                let response = undefined
                if (!preShop) {
                    response = await fetch(`https://api.artic.edu/api/v1/products?&fields=id,image_url,title,max_current_price,description&page=${presentPage}`)
                } else {
                    response = await fetch(`https://api.artic.edu/api/v1/products?limit=4&fields=id,image_url,title,max_current_price,description&page=${presentPage}`)
                }

                const information = await response.json()
                return information
            } catch (error) {
                console.log(error)
            }
        }

        const info = await getStore()

        const storeTitle = document.createElement('h1')
        storeTitle.setAttribute('class', 'storeTitle')
        storeTitle.textContent = 'Store'

        const productsCards = document.createElement('ul')
        productsCards.setAttribute('class', 'productsCards')

        main.append(storeTitle, productsCards)


        //PRODUCTS
        const products = async () => {

            for (const article of await info.data) {

                //FILTERED
                const filterProduct = async (article) => {

                    const product = await article

                    const filteredProduct = {}

                    filteredProduct['id'] = product.id
                    product.image_url == null ? filteredProduct['image'] = '' : filteredProduct['image'] = product.image_url
                    product.title == null || product.title == '' ? filterProduct['title'] = 'Untitle' : filteredProduct['title'] = product.title
                    product.max_current_price == null || product.max_current_price == '' ? filteredProduct['price'] = 'Unknown price' : filteredProduct['price'] = product.max_current_price
                    product.description == null || product.description == undefined ? filteredProduct['description'] = '' : filteredProduct['description'] = product.description

                    return filteredProduct
                }

                const filteredInformation = await filterProduct(article)

                //CARD
                const productCard = document.createElement('li')
                productCard.setAttribute('class', 'productCard')

                const titleProduct = document.createElement('h2')
                titleProduct.textContent = filteredInformation.title

                const priceProduct = document.createElement('h3')
                priceProduct.textContent = `$ ${filteredInformation.price}`

                const figureProduct = document.createElement('figure')
                const imageProduct = document.createElement('img')
                imageProduct.setAttribute('data-img', filteredInformation.image)
                imageProduct.setAttribute('title', filteredInformation.title)
                imageProduct.setAttribute('alt', filteredInformation.title)
                imageProduct.addEventListener('error', () => {
                    imageProduct.setAttribute('src', '../src/assets/error/imageError.png')
                    imageProduct.setAttribute('data-img', '../src/assets/error/imageError.png')
                });
                figureProduct.appendChild(imageProduct)

                //OBSERVER
                observer.observe(imageProduct, figureProduct)

                //DESCRIPTION
                const descriptionProduct = document.createElement('p')
                descriptionProduct.innerHTML = filteredInformation.description

                descriptionProduct.textContent = `${descriptionProduct.textContent.slice(0, 200)} ...`

                productCard.append(titleProduct, descriptionProduct, priceProduct, figureProduct)
                productsCards.appendChild(productCard)

                titleProduct.addEventListener('click', () => {
                    location.hash = `#product=${filteredInformation.id}`
                    informationProduct(filteredInformation.id)
                })

                figureProduct.addEventListener('click', () => {
                    location.hash = `#product=${filteredInformation.id}`
                    informationProduct(filteredInformation.id)
                })
            }
        }

        await products()

        //NAV PAGE
        const storeNavSection = document.createElement('section')
        storeNavSection.setAttribute('class', 'storeNavSection')

        const selectPage = document.createElement('select')
        selectPage.setAttribute('title', 'Select products page')

        storeNavSection.appendChild(selectPage)

        for (let index = 1; index <= info.pagination.total_pages; index++) {
            const optionPage = document.createElement('option')
            optionPage.setAttribute('value', index)
            optionPage.textContent = index

            selectPage.appendChild(optionPage)

            if (optionPage.textContent == presentPage) { optionPage.setAttribute('selected', '') }
        }

        selectPage.addEventListener('change', function () {
            main.innerHTML = ''
            storeContent(Number(this.value))
        })

        if (presentPage != 1) {
            const previousPage = document.createElement('button')
            previousPage.setAttribute('class', 'buttonPrevious')
            previousPage.setAttribute('type', 'button')
            previousPage.setAttribute('title', 'Previous page')

            const previousFigure = document.createElement('figure')

            const previousSvg = document.createElementNS(ns, 'svg')
            previousSvg.setAttribute('viewBox', '0 0 100 80')
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
                main.innerHTML = ''
                storeContent(presentPage)
            })

            if (!preShop) {
                storeNavSection.appendChild(previousPage)
            }

        }

        if (!preShop) {
            main.appendChild(storeNavSection)
        }

        if (presentPage != info.pagination.total_pages) {
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
                main.innerHTML = ''
                storeContent(presentPage)
            })

            if (!preShop) {
                storeNavSection.appendChild(nextPage)
            }
        }

        //PRESHOP
        if (preShop) {
            const divMoreProducts = document.createElement('div')
            divMoreProducts.setAttribute('class', 'divMoreProducts')
            const textMoreProducts = document.createElement('p')
            textMoreProducts.textContent = 'More products from the store'
            const figureMoreProducts = document.createElement('figure')
            figureMoreProducts.setAttribute('class', 'figureMoreProducts')
            const imgMoreProducts = document.createElement('img')
            imgMoreProducts.alt = 'More products from the store'
            imgMoreProducts.title = 'More products from the store'
            imgMoreProducts.src = '../src/assets/home/storeHome.png'
            figureMoreProducts.appendChild(imgMoreProducts)
            divMoreProducts.append(textMoreProducts, figureMoreProducts)
            main.appendChild(divMoreProducts)

            figureMoreProducts.addEventListener('click', () => {
                location.hash = `#store`
            })
        }
    }

    storeContent(1)

}

export default store