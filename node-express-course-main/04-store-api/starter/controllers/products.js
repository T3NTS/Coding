const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}.sort('name price'))
    res.status(200).json({products})
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = {$regex: name, $options: 'i'}
    }
    if (numericFilters) {
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '<=':'$lte',
            '<':'$lt',
            '=':'$eq',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(
            regEx, 
            (match) => `-${operatorMap[match]}-`)
        const options = ['price','rating']
        //console.log(filters)
        filters = filters.split(',').forEach(item => {
            const [field, operator, value] = item.split('-')
            //console.log(field,operator,value)
            if (options.includes(field)) {
                queryObject[field] = {[operator]: Number(value)}
            }
        })
    }

    console.log(queryObject)
    let result = Product.find(queryObject)

    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }
    if (fields) {
        const fieldsList = fields.split(',').join(' ') 
        result = result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({ 
        products,
        nbHits: products.length
     })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}