const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const { Survey } = require('../db/survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = (app) => {
  app.get('/api/surveys/thanks', (request, response) => {
    response.send('Thank you for answering the survey!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (request, response) => {
    const {
      title,
      subject,
      body,
      recipients,
    } = request.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: request.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    const statusCode = await mailer.send();
    if (statusCode < 300 && statusCode >= 200) {
      console.log('Survey Email Request Accepted');
      await survey.save();
      request.user.credits -= 1;
      const user = await request.user.save();
      response.send(user);
    } else {
      console.log('Survey Email Request not Working');
      response.status(statusCode).send(request.user);
    }
  });
};
