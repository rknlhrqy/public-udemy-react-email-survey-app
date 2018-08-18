const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const { Survey } = require('../db/survey');

module.exports = (app) => {
  app.post('/api/surveys', requireLogin, requireCredits, (request, response) => {
    const { title, subject, body, recipients } = request.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email })),
      _user: request.user.id,
      dateSent: Date.now(),
    });
  });
};
