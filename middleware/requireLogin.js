module.exports = (request, response, next) => {
  if (!request.user) {
    return response.status(401).send({ error: 'You need to log in!' });
  }
  next();
};
