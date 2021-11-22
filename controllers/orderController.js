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
                include: [
                    'items',
                ],
                raw: true,
                nest: true,
            })
                .then(orders => {
                    const _orders = Object.assign({},orders)

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
        var mailOptions = {
            from: 'iita71737@gmail.com',
            to: 'iita71737+ac@gmail.com',
            subject: ` 訂單成立`,
            text: ` 訂單成立`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return Promise.all(results).then(() =>
            res.redirect('/cart')
        );
    }
}

module.exports = orderController