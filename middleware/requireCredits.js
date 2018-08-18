module.exports = (request, response, next) => {
  if (request.user.credits <= 0) {
    response.status(403).send({ error: 'Not enough credits!' });
  }
  next();
};
