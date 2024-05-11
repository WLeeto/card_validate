import { CardValidation } from "../src/js/card_validation";

describe("CardValidation", () => {
  let inputElement;
  let cardValidation;

  beforeEach(() => {
    // Создаем мок элемента input перед каждым тестом
    inputElement = {
      addEventListener: jest.fn(),
      value: "",
      dispatchEvent: jest.fn(), // Добавляем мок для dispatchEvent
    };
    cardValidation = new CardValidation(inputElement);
  });

  test("should add event listener to input element", () => {
    expect(inputElement.addEventListener).toHaveBeenCalledWith(
      "input",
      cardValidation.handleInput
    );
  });

  test("should validate card numbers using Luhn algorithm", () => {
    const validCardNumbers = [
      "4111111111111111", // Visa
      "5555555555554444", // Mastercard
      "378282246310005", // American Express
      "6011111111111117", // Discover
      "3530111333300000", // JCB
      "30569309025904", // Diners Club International
      "2201382000000013", // Mir
    ];

    const invalidCardNumbers = [
      "4111111111111112", // Invalid Visa
      "5555555555554443", // Invalid Mastercard
      "378282246310006", // Invalid American Express
      "6011111111111116", // Invalid Discover
      "3530111333300001", // Invalid JCB
      "30569309025905", // Invalid Diners Club International
      "2200000000000001", // Invalid Mir
    ];

    validCardNumbers.forEach((cardNumber) => {
      expect(cardValidation.luhnCheck(cardNumber)).toBe(true);
    });

    invalidCardNumbers.forEach((cardNumber) => {
      expect(cardValidation.luhnCheck(cardNumber)).toBe(false);
    });
  });
});
