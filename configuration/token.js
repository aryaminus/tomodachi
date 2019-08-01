var jwt = require("jsonwebtoken");

var createToken = function(auth) {
  return jwt.sign(
    {
      id: auth.id
    },
    "my-secret",
    {
      expiresIn: 60 * 120
    }
  );
};

module.exports = {
  generateToken: function(req, res, next) {
    req.token = createToken(req.auth);
    return next();
  },
  sendToken: function(req, res) {
    res.setHeader("x-auth-token", req.token);
    return res.status(200).send(JSON.stringify(req.user));
  },
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      // Bearer <token>
      const token = req.headers.authorization.split(" ")[1];
      try {
        // Make sure that the token hasn't expired
        result = jwt.verify(token, "my-secret", {
          expiresIn: 60 * 120
        });
        // Pass back the decoded token to the request object
        req.decoded = result;
        return next();
      } catch (err) {
        // if (err) throw err;
        return next();
      }
    }
  }
};
