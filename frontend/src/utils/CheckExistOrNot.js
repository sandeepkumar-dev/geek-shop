const CheckExist = ({ arr, id }) => {
    return arr?.some(item => item.id === id)
}

export default CheckExist