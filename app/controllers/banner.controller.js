const catchAsync = require('../utils/catchAsync')
const BannerRepository = require('../repositories/banner.repository')

const getAll = catchAsync(async (req, res) => {
    const body = req.body

    let banner = await BannerRepository.getAll()
    let result = {
        status: true,
        date: banner
    }

    return res.status(200).json(result)
})

module.exports = {
    getAll
}