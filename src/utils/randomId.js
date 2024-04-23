const randomId = () => {
    const exponent = Math.floor(Math.random() * 7)
    const baseNumber = Math.random() * 10 ** exponent
    const id = Math.floor(baseNumber)
    return id
}

export default randomId