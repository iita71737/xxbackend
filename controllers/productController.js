const db = require('../models')
const Product = db.Product;
const Images = db.Images;
const PAGE_LIMIT = 3;
const PAGE_OFFSET = 0;
const Cart = db.Cart

let productController = {
    getProducts: async (req, res) => {
        await Product.findAndCountAll({
            raw: true,
            nest: true,
            offset: PAGE_OFFSET,
            limit: PAGE_LIMIT,
            include: [
                {
                    model: Images,
                    attributes: ['url']
                }
            ]
        })
            .then(products => {
               // console.log(products)
                return Cart.findByPk(req.session.cartId, {
                    include: [{
                        model: Product,
                        as: 'items',
                        include: [
                            {
                                model: Images,
                                attributes: ['url'],
                            }
                        ]
                    }]
                })
                    .then(cart => {

                        cart = cart || { items: [] }
                        let totalPrice = cart.items.length > 0 ? cart.items.map(d => d.price * d.LineItem.quantity).reduce((a, b) => a + b) : 0
                        if (cart.items.length != 0) {
                            cart = cart.toJSON()
                            //console.log('cart', cart)
                        }
                        return res.render('products', {
                            products,
                            cart,
                            totalPrice,
                        })
                    })
            })
    }
}

module.exports = productController