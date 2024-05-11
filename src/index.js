import "./css/style.css";

import "./js/app";
import { CardValidation } from "./js/card_validation";

const cardInputElement = document.getElementById("card_number");
const cardValidator = new CardValidation(cardInputElement);
