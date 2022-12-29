const mongodb = require("mongodb");

exports.login = (req, res) => {
  const reqData = req.body;
  console.log(reqData);
  console.log(req.session);

  res.end();
};
