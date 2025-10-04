import { v4 as uuidv4 } from "uuid";

export const requestIdMiddleware = (req, res, next) => {
  req.id = uuidv4();
  res.setHeader("X-Request-ID", req.id);
  next();
};