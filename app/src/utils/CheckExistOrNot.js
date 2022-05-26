const CheckExist = ({ arr, _id }) => {
    return arr?.some(item => item._id === _id)
}

export default CheckExist