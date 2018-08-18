const requireLogin = require('../middleware/requireLogin');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (request, response) => {
    try {
      await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 email survey credits',
        source: request.body.id,
      });
      request.user.credits += 5;
      const user = await request.user.save();
      response.send(user);
    } catch (error) {
      console.log(error);
    }
  });
};
