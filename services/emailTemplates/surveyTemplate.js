const keys = require('../../config/keys');

module.exports = survey => `
  <html>
    <body>
      <div style="text-align: center;">
        <h3>${survey.title}</h3>
        <p>${survey.subject}</p>
        <p>${survey.body}</p>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
        </div>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
        </div>
      </div>
    </body>
  </html>
`;
