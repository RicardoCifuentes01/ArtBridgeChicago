const cardProduct = () => {

    class cardProduct extends HTMLElement {
        constructor() {
            super()
        }

        connectedCallback() {
            this.image = this.getAttribute('image')
            this.title = this.getAttribute('title')
            this.price = this.getAttribute('price')
            this.urlWeb = this.getAttribute('urlWeb')
            this.description = this.getAttribute('description')
        }

        getTemplate() {

            const template = document.createElement('template')

            const figureProduct = document.createElement('figure')
            figureProduct.className = 'figureWork'
            const imageProduct = document.createElement('img')
            imageProduct.setAttribute('src', this.image)
            imageProduct.setAttribute('alt', this.title)
            imageProduct.setAttribute('title', this.title)
            figureProduct.appendChild(imageProduct)

            const ns = 'http://www.w3.org/2000/svg'

            const buttonLike = document.createElement('figure')
            buttonLike.className = 'buttonLikeProduct'

            const svgLike = document.createElementNS(ns, 'svg')
            svgLike.setAttribute('viewBox', '0 0 512 512')
            svgLike.setAttribute('width', '24')
            svgLike.setAttribute('height', '24')
            svgLike.setAttribute('title', 'like')
            svgLike.setAttribute('alt', 'like')
            svgLike.setAttribute('id', 'heart')

            const pathLike = document.createElementNS(ns, 'path')
            pathLike.setAttribute('id', 'pathHeart')
            pathLike.setAttribute('d', 'M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z')

            svgLike.appendChild(pathLike)

            buttonLike.appendChild(svgLike)

            const titleProduct = document.createElement('h1')
            titleProduct.textContent = `${this.title}`
            titleProduct.className = 'titleProduct'

            const divBuy = document.createElement('div')
            divBuy.className = 'divBuy'

            const priceProduct = document.createElement('h2')
            priceProduct.textContent = `$ ${this.price}`
            priceProduct.className = 'priceProduct'

            const buyProduct = document.createElement('a')
            buyProduct.textContent = 'BUY'
            buyProduct.setAttribute('href', this.urlWeb)
            buyProduct.className = 'buyProduct'

            divBuy.append(priceProduct, buyProduct)

            const descriptionProduct = document.createElement('p')
            descriptionProduct.innerHTML = `${this.description}`

            const divInformationProduct = document.createElement('div')
            divInformationProduct.className = 'informationWork'

            divInformationProduct.append(buttonLike, titleProduct, divBuy, descriptionProduct)

            template.content.append(figureProduct, divInformationProduct)

            return template
        }

        render() {
            this.appendChild(this.getTemplate().content.cloneNode(true))
        }

        connectedCallback() {
            this.render()
        }
    }
    customElements.define('card-product', cardProduct)
}

export default cardProduct