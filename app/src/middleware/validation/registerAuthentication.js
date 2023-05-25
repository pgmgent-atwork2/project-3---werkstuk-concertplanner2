import { body } from "express-validator";

export default [
  body("email").isEmail().withMessage("Geef een geldig e-mailadres op"),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Het wachtwoord moet tussen de 8 en 20 karakters lang zijn"),
];
