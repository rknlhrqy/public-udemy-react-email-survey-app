const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const { Survey } = require('../db/survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = (app) => {

  app.get('/api/surveys', async (request, response) => {
    const surveys = await Survey.find({
      _user: request.user.id,
    }).select({
      recipients: false,
    });
    response.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (request, response) => {
    response.send('Thank you for answering the survey!');
  });

  app.post('/api/surveys/webhooks', (request, response) => {
    try {
      const pathdata = new Path('/api/surveys/:surveyId/:choice');
      _.chain(request.body)
        .map((event) => {
          const { pathname } = new URL(event.url);
          const match = pathdata.test(pathname);
          if (match) {
            return { email: event.email, surveyId: match.surveyId, choice: match.choice };
          }
          return undefined;
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({ email, surveyId, choice }) => {
          Survey.updateOne({
            _id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false },
            },
          }, {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date(),
          }).exec();
        })
        .value();
      response.send({});
    } catch (error) {
      console.log('Error in processing request:', error);
    }
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
    try {
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
        response.status(statusCode).send();
      }
    } catch (error) {
      console.log('Survey Email Request Error', error);
    }
  });
};
