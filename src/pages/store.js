const store = async (main) => {


    const storeContent = async (presentPage) => {
        const getStore = async () => {
            try {
                const response = await fetch(`https://api.artic.edu/api/v1/products?fields=image_url,title,max_current_price,description&page=${presentPage}`)
                const information = await response.json()
                return information
            } catch (error) {
                console.log(error)
            }
        }

        const info = await getStore()

        const storeTitle = document.createElement('h1')
        storeTitle.textContent = 'Store'

        main.appendChild(storeTitle)

        const products = async () => {

            for (const article of await info.data) {

                const filterProduct = async (article) => {

                    const product = await article

                    const filteredProduct = {}

                    product.image_url == null ? filteredProduct['image'] = '' : filteredProduct['image'] = product.image_url
                    product.title == null || product.title == '' ? filterProduct['title'] = 'Untitle' : filteredProduct['title'] = product.title
                    product.max_current_price == null || product.max_current_price == '' ? filteredProduct['price'] = 'Unknown price' : filteredProduct['price'] = product.max_current_price
                    product.description == null || product.description == undefined ? filteredProduct['description'] = '' : filteredProduct['description'] = product.description

                    return filteredProduct
                }

                const filteredInformation = await filterProduct(article)

                const productDiv = document.createElement('div')

                const titleProduct = document.createElement('h2')
                titleProduct.textContent = filteredInformation.title

                const priceProduct = document.createElement('h2')
                priceProduct.textContent = `$ ${filteredInformation.price}`

                const figureProduct = document.createElement('figure')
                const imageProduct = document.createElement('img')
                imageProduct.setAttribute('src', filteredInformation.image)
                figureProduct.appendChild(imageProduct)

                const descriptionProduct = document.createElement('p')
                descriptionProduct.innerHTML = filteredInformation.description

                productDiv.append(titleProduct, descriptionProduct, priceProduct, figureProduct)
                main.appendChild(productDiv)
            }
        }

        await products()

        const selectPage = document.createElement('select')

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
            previousPage.textContent = 'previous'

            const previousFigure = document.createElement('figure')
            const previousImg = document.createElement('img')
            previousFigure.appendChild(previousImg)
            previousImg.setAttribute('alt', 'Previous page')
            previousImg.setAttribute('title', 'Previous page')

            previousPage.addEventListener('click', function () {
                presentPage = presentPage - 1
                main.innerHTML = ''
                storeContent(presentPage)
            })

            main.appendChild(previousPage)

        }

        main.appendChild(selectPage)

        if (presentPage != info.pagination.total_pages) {
            const nextPage = document.createElement('button')
            nextPage.textContent = 'next'
            const nextFigure = document.createElement('figure')
            const nextImg = document.createElement('img')
            nextFigure.appendChild(nextImg)
            nextImg.setAttribute('alt', 'Next page')
            nextImg.setAttribute('title', 'Next page')

            nextPage.addEventListener('click', function () {
                presentPage = presentPage + 1
                main.innerHTML = ''
                storeContent(presentPage)
            })

            main.appendChild(nextPage)
        }

    }

    storeContent(1)

}

export default store