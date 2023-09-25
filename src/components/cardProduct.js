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
            const imageProduct = document.createElement('img')
            imageProduct.setAttribute('src', this.image)
            imageProduct.setAttribute('alt', this.title)
            imageProduct.setAttribute('title', this.title)
            figureProduct.appendChild(imageProduct)

            const titleProduct = document.createElement('h1')
            titleProduct.textContent = `${this.title}`

            const priceProduct = document.createElement('h2')
            priceProduct.textContent = `$ ${this.price}`

            const buyProduct = document.createElement('a')
            buyProduct.textContent = 'BUY'
            buyProduct.setAttribute('href', this.urlWeb)

            const descriptionProduct = document.createElement('p')
            descriptionProduct.innerHTML = `${this.description}`

            template.content.append(figureProduct, titleProduct, priceProduct, buyProduct, descriptionProduct)

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