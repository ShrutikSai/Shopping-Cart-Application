import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization
      ? req.headers.authorization.split(" ")
      : [];
    const token = authorization.length > 1 ? authorization[1] : null;
    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload) {
        req.user = {
          _id: payload._id,
          username: payload.username,
          email: payload.email,
          role: payload.role,
        };
        return next();
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      return res.status(400).json({ error: "Token is required" });
    }
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
export default isAuth;
