const getHash = () => {
    const [page, id] = location.hash.split('=')
    const hash = { page: page, id: id }
    return hash
}

export default getHash