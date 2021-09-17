module.exports = (err, req, res, _next) => {
  console.log(err);
  if (err.isJoi) {
    return res.status(400)
      .json({ error: { message: err.details[0].message } });
  };

  const statusByErrorCode = {
    notFound: 404,
    alreadyExists: 409,
  };

  const status = statusByErrorCode[err.code] || 500;

  return res.status(status).json({ error: { message: err.message } });
};
