const db = require('../models')
const Cart = db.Cart
const LineItem = db.LineItem
const Product = db.Product
const Images = db.Images
const PAGE_LIMIT = 10;
const PAGE_OFFSET = 0;

let cartController = {
    getCart: async (req, res) => {
        try {
            return await Cart.findByPk(req.session.cartId, {
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
            }).then(cart => {
                cart = cart || { items: [] }

                let totalPrice = cart.items.length > 0 ? cart.items.map(d => d.price * d.LineItem.quantity).reduce((a, b) => a + b) : 0
                if (cart.items.length != 0) {
                    //console.log('cart.items', cart.items)
                    cart = cart.toJSON()
                }
                return res.render('cart', {
                    cart: cart,
                    totalPrice,
                })
            })
        } catch (err) {
            console.log(`ERROR! => ${err.name}: ${err.message}`)
            res.status(500).send(err.message)
        }
    },
    postCart: async (req, res) => {
        try {
            const [cart, created] = await Cart.findOrCreate({
                where: {
                    id: req.session.cartId || 0
                }
            })
            if (cart) {
                const [lineItem, created] = await LineItem.findOrCreate({
                    where: {
                        CartId: cart.id,
                        ProductId: req.body.productId,
                    },
                    default: {
                        CartId: cart.id,
                        ProductId: req.body.productId,
                        quantity: 1
                    }
                })
                if (lineItem) {
                    await lineItem.update(
                        {
                            quantity: (lineItem.quantity || 0) + 1,
                        }
                    ).then(lineItem => {
                        req.session.cartId = cart.id
                        req.session.save(() => {
                            res.redirect('back')
                        })
                    })
                }
            }
        }
        catch (err) {
            console.log(`ERROR! => ${err.name}: ${err.message}`)
            res.status(500).send(err.message)
        }
    },
    addCartItem: (req, res) => {
        LineItem.findByPk(req.params.id).then(lineItem => {
            lineItem.update({
                quantity: lineItem.quantity + 1,
            })
                .then((lineItem) => {
                    return res.redirect('back')
                })
        })
    },
    subCartItem: (req, res) => {
        LineItem.findByPk(req.params.id).then(lineItem => {
            lineItem.update({
                quantity: lineItem.quantity - 1 >= 1 ? lineItem.quantity - 1 : 1,
            })
                .then((lineItem) => {
                    return res.redirect('back')
                })
        })
    },
    deleteCartItem: (req, res) => {
        LineItem.findByPk(req.params.id).then(lineItem => {
            lineItem.destroy()
                .then((lineItem) => {
                    return res.redirect('back')
                })
        })
    }
}

module.exports = cartController