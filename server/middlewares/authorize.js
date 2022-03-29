const jwt = require('jsonwebtoken');

exports.authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    (req, res, next) => {
      let token = req.headers['x-access-token'] || req.headers['authorization'];

      if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }

      jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err)
          return res
            .status(401)
            .send({ auth: false, message: 'Failed to authenticate token.', err: err });

        const role = decoded.role;

        if (roles.length == 0) return next();

        let isAuthorized = roles.find((item) => item == role);

        if (!isAuthorized) return res.status(401).json({ message: 'Unauthorized' });

        next();
      });
    },
  ];
};
