function SortedBrands({ arr }) {
    const brands = arr.reduce((acc, value) => {
        if (acc[value.brand] !== undefined) {
            return { ...acc, [value.brand]: acc[value.brand] + 1 }
        } else {
            return { ...acc, [value.brand]: 1 }
        }
    }, []);
    const sortedBrands = Object.keys(brands).sort((a, b) => brands[b] - brands[a]);

    if (sortedBrands.length > 5) {
        return sortedBrands.slice(0, 5)
    }

    return sortedBrands
}

export default SortedBrands