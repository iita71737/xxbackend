const db = require('../models')
const Order = db.Order
const Product = db.Product;
const OrderItem = db.OrderItem
const Cart = db.Cart
const faker = require('faker')
const path = require('path');

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: "OAuth2",
        user: process.env.MY_EMAIL,
        clientId: process.env.CLINENT_ID,
        clientSecret: process.env.CLINENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
    },
});

console.log('test', process.env.MY_EMAIL)

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
                    //console.log('orders====>>', orders)
                    return res.render('orders', {
                        orders
                    })
                })
        } catch (err) {
            console.log(`ERROR! => ${err.name}: ${err.message}`)
            res.status(500).send(err.message)
        }
    },

    postOrder: async (req, res) => {
        try {
            return await Cart.findByPk(req.body.cartId, {
                include: 'items'
            }).then(cart => {
                console.log('cart====>', cart)
                return Order.create({
                    name: req.body.name,
                    address: req.body.address,
                    phone: req.body.phone,
                    shipping_status: req.body.shipping_status,
                    payment_status: req.body.payment_status,
                    amount: req.body.amount,
                    sn: faker.datatype.number()
                }).then(order => {

                    var results = [];
                    for (var i = 0; i < cart.items.length; i++) {
                        console.log('=============================')
                        //console.log(order.id, cart.items[i].id)
                        console.log('=============================')
                        // console.log(cart.toJSON())
                        results.push(
                            OrderItem.create({
                                OrderId: order.id,
                                ProductId: cart.items[i].id,
                                amount: cart.items[i].price,
                                quantity: cart.items[i].LineItem.quantity,
                            })
                        );
                    }
                    //console.log(results)

                    var mailOptions = {
                        from: '',
                        to: 'iita71737+AC@gmail.com',
                        subject: `${order.id} 訂單成立`,
                        text: `${order.id} 訂單成立`,
                        //嵌入 html 的內文
                        html: '<h2>Why and How</h2> <p>The <a href="http://en.wikipedia.org/wiki/Lorem_ipsum" title="Lorem ipsum - Wikipedia, the free encyclopedia">Lorem ipsum</a> text is typically composed of pseudo-Latin words. It is commonly used as placeholder text to examine or demonstrate the visual effects of various graphic design. Since the text itself is meaningless, the viewers are therefore able to focus on the overall layout without being attracted to the text.</p>',
                        //附件檔案
                        attachments: [{
                            filename: 'text01.txt',
                            content: '聯候家上去工的調她者壓工，我笑它外有現，血有到同，民由快的重觀在保導然安作但。護見中城備長結現給都看面家銷先然非會生東一無中；內他的下來最書的從人聲觀說的用去生我，生節他活古視心放十壓心急我我們朋吃，毒素一要溫市歷很爾的房用聽調就層樹院少了紀苦客查標地主務所轉，職計急印形。團著先參那害沒造下至算活現興質美是為使！色社影；得良灣......克卻人過朋天點招？不族落過空出著樣家男，去細大如心發有出離問歡馬找事'
                        }, {
                            filename: 'namin.png',
                            path: path.join(__dirname, '../public/images/namin.png')
                        }]
                    };

                    //發送信件方法
                    const sendmail = transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    results.push(sendmail)

                    return Promise.all(results).then(() =>
                        res.redirect('/orders')
                    );

                })
            })
        } catch (err) {
            console.log(`ERROR! => ${err.name}: ${err.message}`)
            res.status(500).send(err.message)
        }
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