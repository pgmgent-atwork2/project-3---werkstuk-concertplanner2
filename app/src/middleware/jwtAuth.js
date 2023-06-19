import jwt from "jsonwebtoken";
import DataSource from "../lib/DataSource.js";

export const jwtAuth = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    //get the payload data out of the token
    const {
      id
    } = jwt.verify(token, process.env.TOKEN);
    //get the user out of the database
    const userRepository = DataSource.getRepository("User");
    const user = await userRepository.findOne({
      where: {
        id
      },
      relations: ["role"],
    });
    //remover the password from the user object
    user.password = "";
    req.user = user;
    //go to the next chain
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/login");
  }
};