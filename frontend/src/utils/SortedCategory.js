function SortedCatetory({ arr }) {
    const category = Object.keys(arr).reduce((acc, curr) => {
        acc[curr] = arr[curr].length;
        return acc;
    }, {});

    const categoryName = Object.keys(category).map(item => {
        return {
            name: item,
            image: getRandomImage(arr[item]),
            count: category[item]
        }
    }
    )
    return categoryName
}

function getRandomImage(arr) {
    const b = arr[Math.floor(Math.random() * arr.length)]
    return b.product_img
}

export default SortedCatetory