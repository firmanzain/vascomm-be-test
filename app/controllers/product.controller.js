const catchAsync = require('../utils/catchAsync')
const ProductRepository = require('../repositories/product.repository')

const getAll = catchAsync(async (req, res) => {
    const body = req.body

    let product = await ProductRepository.getAll()
    let result = {
        status: true,
        date: product
    }

    return res.status(200).json(result)
})

module.exports = {
    getAll
}