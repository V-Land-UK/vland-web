// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  
  let amt = 0;
  for(var i =0; i < items.length; i++){
    amt += parseFloat(items[i]?.amount)
  }
  
  return parseInt(amt*100);
};

export default async function handler(req, res) {
  const { items } = req.body;
  
  // Create a PaymentIntent with the order amount and currency
 
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "gbp",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};