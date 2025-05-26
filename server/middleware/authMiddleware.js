import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;

  // Check for token in cookies first
  if (req.cookies?.token) {
    token = req.cookies.token;
  }
  // Then check Authorization header
  else if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

export const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
