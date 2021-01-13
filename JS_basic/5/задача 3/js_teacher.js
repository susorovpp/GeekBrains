"use strict";

/**
 * Объект, содержащий методы для валидации
 */
const validationMethods = {
    /**
     * Метод проверки поля по длине
     * @param {HTMLInputElement} field поле, которое надо проверить
     * @param {Array} args массив с аргументами
     * @returns {string|null} Строку с ошибкой или null, если ошибки не было
     */
    length(field, args) {
        const valLength = field.value.length,
            sign = args[0],
            then = args[1];

        let message = null;
        switch (sign) {
            case '>':
                if (!(valLength > then)) {
                    message = `Минимальная длина поля: ${then + 1}`;
                }
                break;
            case '<':
                if (!(valLength < then)) {
                    message = `Максимальная длина поля: ${then - 1}`;
                }
                break;
            case '>=':
                if (!(valLength > then)) {
                    message = `Минимальная длина поля: ${then}`;
                }
                break;
            case '<=':
                if (!(valLength < then)) {
                    message = `Максимальная длина поля: ${then}`;
                }
                break;
            case '==':
                if (valLength !== then) {
                    message = `Длина поля должна равняться: ${then} символам`;
                }
                break;
        }

        return message;
    },

    /**
     * Проверяет содержит ли поле только цифры
     * @param {HTMLInputElement} field поле, которое надо проверить
     * @returns {string|null} Строку с ошибкой или null, если ошибки не было
     */
    mustContainNumbers(field) {
        for (const val of field.value) {
            if (!Number.isInteger(Number.parseInt(val))) {
                return 'Поле должно содержать только цифры';
            }
        }

        return null;
    },

    /**
     * Проверяет совпадают ли у двух полей значения
     * @param {HTMLInputElement} field поле, которое надо проверить
     * @param {Array} args массив с аргументами
     * @returns {string|null} Строку с ошибкой или null, если ошибки не было
     */
    fieldsCompare(field, args) {

        return field.value !== document.querySelector(args[0]).value ? 'Поля не совпадают' : null;
    },
}


const form = {
    formEl: null,
    rules: null,

    /**
     * Инициализация формы
     */
    init() {
        this.formEl = document.querySelector('.my-form');
        this.formEl.addEventListener('submit', e => this.formSubmit(e));

        this.rules = [
            {
                selector: 'input[name="name"]',
                methods: [
                    {name: 'length', args: ['>=', 1]},
                    {name: 'length', args: ['<=', 50]},
                ],
            },
            {
                selector: 'input[name="phone"]',
                methods: [
                    {name: 'mustContainNumbers'},
                    {name: 'length', args: ['==', 11]},
                ],
            },
            {
                selector: 'input[name="password"]',
                methods: [
                    {name: 'length', args: ['>=', 5]},
                    {name: 'length', args: ['<=', 50]},
                ],
            },
            {
                selector: 'input[name="passwordConfirm"]',
                methods: [
                    {name: 'fieldsCompare', args: ['input[name="password"]']},
                ],
            },
        ]
    },

    /**
     * Метод, который запускается перед отправкой формы
     * @param {Event} e Событие отправки формы
     */
    formSubmit(e) {
        if (!this.validate()) {
            e.preventDefault();
        }
    },

    /**
     * Валидирует форму
     */
    validate() {
        let isValid = true;

        for (let rule of this.rules) {
            const inputEl = document.querySelector(rule.selector);
            for (let method of rule.methods) {
                const validFunction = validationMethods[method.name];
                const errMessage = validFunction(inputEl, method.args);
                if (errMessage) {
                    this.setInvalidField(inputEl, errMessage);
                    isValid = false;
                    break;
                } else {
                    this.setValidField(inputEl);
                    console.log('ошибки не было');
                }
            }
        }

        return isValid;
    },

    /**
     * Устанавливает класс провала валидации инпуту и ставит сообщение о том, почему валидация провалена
     * @param {Element} inputEl элемент инпута, который провалидировал валидацию
     * @param {string} message сообщение об ошибке
     */
    setInvalidField (inputEl, message) {
        const cl = inputEl.classList;
        cl.remove('is-valid');
        cl.add('is-invalid');

        let hintWrap = inputEl.parentNode.querySelector('.invalid-feedback');
        if (!hintWrap) {
            hintWrap = document.createElement('div');
            hintWrap.classList.add('invalid-feedback');
            inputEl.parentNode.appendChild(hintWrap)
        }

        hintWrap.textContent = message;
    },

    /**
     * Устанавливает класс прохождения валидации инпуту и убирает сообщение о провале валидации, если такое было
     * @param {Element} inputEl элемент инпута, который провалидировал валидацию
     */
    setValidField (inputEl) {
        const cl = inputEl.classList;
        cl.remove('is-invalid');
        cl.add('is-valid');
    },
};

form.init();

// за основу брал https://monsterlessons.com/project/lessons/validaciya-formy-v-javascript

// Урок 5, задание 3:
// Создать форму в html со следующими полями:
// * Имя - текстовое поле
// * Телефон - текстовое поле
// * Пароль - поле типа password
// * Повтор пароля - поле типа password
// * Кнопка отправить форму
// Необходимо реализовать валидацию этой формы по следующим правилам:
// * Имя - должно содержать как минимум 1 символ, не более 50 символов.
// * Телефон - должно содержать 11 цифр, не больше, не меньше.
// * Пароль - минимум 5 символов, максимум 50
// * Повтор пароля - значение должно совпадать с полем пароль.
// * Кнопка отправить форму - при нажатии на кнопку форма должна провериться, при
// прохождении проверки, форма
// отправляется, если проверка не была пройдена, то:
// - Каждое поле, которое не прошло проверку должно выделяться красным цветом.
// - Под каждым полем, что не прошло проверку, должна писаться подсказка по какой
// причине проверка провалилась.
// Можете пользоваться стилями бутстрапа, если лень самим писать.
// Пользоваться аттрибутами HTML5 запрещено, необходимо проверки реализовать с
// помощью javascript.