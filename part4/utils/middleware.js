const errorHandler = (err, req, res, next) => {
  res.status(400).end()
}

module.exports = {
  errorHandler
}