import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token = req.cookies.token;

  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId; // Make sure payload contains userId
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token failed or expired' });
  }
};
