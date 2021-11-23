const db = require('../models')
const Order = db.Order
const Product = db.Product;
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: '',
    },
});

let orderController = {
    getOrders: async (req, res) => {
        try {
            await Order.findAll({
                include: 'items',
                // raw: true,
                //nest: true
            })
                .then(orders => {
                    // console.log('ordersssss====>>', orders)
                    orders = orders.map(item => item.toJSON())
                    console.log('orders====>>', orders)
                    return res.render('orders', {
                        orders
                    })
                })
        } catch (err) {
            console.log(`ERROR! => ${err.name}: ${err.message}`)
            res.status(500).send(err.message)
        }
    },

    postOrder: (req, res) => {
        return Cart.findByPk(req.body.cartId, { include: 'items' }).then(cart => {
            return Order.create({
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                shipping_status: req.body.shipping_status,
                payment_status: req.body.payment_status,
                amount: req.body.amount,
            }).then(order => {

                var results = [];
                for (var i = 0; i < cart.items.length; i++) {
                    console.log(order.id, cart.items[i].id)
                    results.push(
                        OrderItem.create({
                            OrderId: order.id,
                            ProductId: cart.items[i].id,
                            price: cart.items[i].price,
                            quantity: cart.items[i].CartItem.quantity,
                        })
                    );
                }

                return Promise.all(results).then(() =>
                    res.redirect('/orders')
                );

            })
        })
    },
    cancelOrder: (req, res) => {
        return Order.findByPk(req.params.id, {}).then(order => {
            order.update({
                ...req.body,
                shipping_status: '-1',
                payment_status: '-1',
            }).then(order => {
                return res.redirect('back')
            })
        })
    },
}

module.exports = orderController