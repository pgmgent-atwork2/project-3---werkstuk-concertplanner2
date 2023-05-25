import { body } from "express-validator";

export default [
  body("email").isEmail().withMessage("e-mail is niet correct"),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("het wachtwoord komt niet overeen"),
];
