
export class CardValidation {
    constructor(inputElement) {
        console.log('constructor!');
        this.input = inputElement; // Получаем поле ввода из аргумента конструктора
        console.log(this.input);

        // Привязываем контекст метода handleInput к текущему экземпляру класса
        this.handleInput = this.handleInput.bind(this);

        // Добавляем обработчик события input
        this.input.addEventListener('input', this.handleInput);
    }

    // Метод для обработки ввода
    handleInput(event) {
        const inputValue = event.target.value; // Получаем значение из поля ввода
        console.log('Input Value:', inputValue); // Выводим значение в консоль

        // Определяем, является ли введенный номер карты валидным согласно алгоритму Луна
        const isValid = this.luhnCheck(inputValue);

        // Обновляем видимость каждой карты в списке в соответствии с результатом проверки
        const cardListItems = document.querySelectorAll('.cards-item');
        cardListItems.forEach(cardItem => {
            const cardImage = cardItem.querySelector('img');
            const cardType = cardImage.alt.toLowerCase().replace(' ', '_'); // Приводим к нижнему регистру и заменяем пробелы на подчеркивания для сопоставления с ключами в объекте cardTypes
            const cardTypePattern = this.cardTypes[cardType];
            const isMatching = cardTypePattern.test(inputValue) && isValid;
            console.log(`${cardImage.alt}:`, isMatching);
            // Выводим true или false для каждой карты

            // Добавляем класс .grayscale, если результат проверки равен false
            if (!isMatching) {
                cardImage.classList.add('grayscale');
            } else {
                cardImage.classList.remove('grayscale');
            }
        });
    }

    // Метод для проверки валидности карты по алгоритму Луна
    luhnCheck(cardNumber) {
        let sum = 0;
        let shouldDouble = false;
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i));
            if (shouldDouble) {
                if ((digit *= 2) > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    }

    // Объект для хранения регулярных выражений для каждого типа карты
    cardTypes = {
        mir: /^220[0-4]/,
        visa: /^4/,
        mastercard: /^5[1-5]/,
        american_express: /^3[47]/,
        discover: /^6(?:011|5)/,
        jcb: /^(?:2131|1800|35)/,
        diners_club_international: /^3(?:0[0-5]|[68])/
    };
}
