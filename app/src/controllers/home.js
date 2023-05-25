// import DataSource from "../lib/DataSource.js";

export const home = async (req, res) => {
  // get the user repository


const userRole= req.user.role.label;

if(userRole === "admin"){
  res.render("admin")}
  else if(userRole === "user"){
  res.render("user");}
};