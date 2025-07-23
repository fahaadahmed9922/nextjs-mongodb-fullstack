import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";

export function verifyToken(req) {
  const token = req.cookies?.token;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}
