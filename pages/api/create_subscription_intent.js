
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


export default async function handler(req,res){
    const {item} = req.body
    const sub_products = {"5":"price_1MoPdHRmR3QOo6zuuB9OToeU",
                        "10":"price_1MoPd6RmR3QOo6zu0yHLPmbB",
                        "20":"price_1MoPcQRmR3QOo6zu2Nw6sc2U"
                    }
    const customer = await stripe.customers.create({
        email: item.email
    });
    const customerId = customer?.id
    const priceId = sub_products[`${item.amount}`];
    
    try{
        const subscription = await stripe.subscriptions.create({
            customer:customerId,
            items:[{
                price:priceId
            }],
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription' },
            expand: ['latest_invoice.payment_intent'],

        });
        res.send({
            subscriptionId: subscription.id,
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        });
    }
    catch(error){
        return res.status(400).send({ error: { message: error.message } });
    }
    
}