import jwt from "jsonwebtoken";

export const generateToken = (id: string) => {
  return jwt.sign({ id, role: "admin" }, "SECRET_KEY", {
    expiresIn: "7d",
  });
};