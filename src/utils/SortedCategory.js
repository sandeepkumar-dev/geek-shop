function SortedCatetory({ arr }) {
    const categories = arr.reduce((acc, value) => {
        let { category } = value
        if (!acc[category]) {
            acc[category] = {
                name: category,
                image: getRandomImage(arr, category),
                count: 1
            }
        } else {
            acc[category].count++
        }
        return acc
    }, {})



    const sortedCategories = Object.values(categories).sort((a, b) => b.count - a.count);

    return sortedCategories
}

function getRandomImage(arr, category) {
    const a = arr.filter(item => item.category === category)
    const b = a[Math.floor(Math.random() * a.length)]
    return b.product_img
}

export default SortedCatetory