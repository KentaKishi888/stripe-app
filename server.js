const stripe = require('stripe')
('sk_test_51LQ9nIIAbInGYe04HnQbatPv6jLIcsxKWbFDMTAfNB4gcEFUvNHCtBf25l0k81doYz1nU2Jf9Y3RnHQ3TFyMVKMO00XCQDuylZ');
const express = require("express");
const app = express();
const PORT = 3000;
const LOCALHOST = "http://localhost:3000";


app.use(express.static("public"));

app.post("/create-checkout-session", async(req, res) => {
    try {
        const prices = await stripe.prices.list();
        console.log(prices);
        //session 
        const session = await stripe.checkout.sessions.create({
            line_items:[{
                price:prices.data[0].id,
                quantity:1,
             }
            ],
            mode:"subscription",
            success_url:`${LOCALHOST}/success.html?session_id={CHECKOUT_SESSION_ID}}`,
            cancel_url:`${LOCALHOST}/cancel.html`,
        });

        res.redirect(303, session.url);

    } catch (err) {
        console.log(err);
    }
});




app.listen(PORT, console.log("server is running"));