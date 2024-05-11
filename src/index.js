import "./css/style.css";

import "./js/app.js";
import { CardValidation } from "./js/card_validation.js";

const cardInputElement = document.getElementById("card_number");
const cardValidator = new CardValidation(cardInputElement);
