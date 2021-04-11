id"use strict";

const form = document.querySelector('#form');
const userName = document.querySelector('#name');
const userPhone = document.querySelector('#phone');
const userPassword = document.querySelector('#password');
const userPasswordConfirm = document.querySelector('#passwordConfirm');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    removeValidation();

    validateName();

    validatePhone();

    validatePassword();

    validatePasswordConfirm();
})

const generateError = (text) => {
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.style.fontSize = '12px';
    error.style.padding = '5px';
    error.innerHTML = text;
    return error;
}

const removeValidation = () => {
    const errors = document.querySelectorAll('.error');

    for (const error of errors) {
        error.remove();
    }
};

const validateName = () => {
    let text = '';

    if (userName.value.length < 1) {
        text = 'Поле должно содержать как минимум 1 символ';
    } else if (userName.value.length > 50) {
        text = 'Поле должно содержать не более 50 символов';
    }

    const error = generateError(text);
    userName.parentElement.appendChild(error);
};

const validatePhone = () => {
    if (userPhone.value.length !== 11) {
        const error = generateError('Поле должно содержать 11 цифр, не больше, не меньше');
        userPhone.parentElement.appendChild(error);
    }    
};

const validatePassword = () => {
    let text = '';

    if (userPassword.value.length < 5) {
        text = 'Поле должно содержать как более 5 символов';
    } else if (userName.value.length > 50) {
        text = 'Поле должно содержать не более 50 символов';
    }

    const error = generateError(text);
    userPassword.parentElement.appendChild(error);
};

const validatePasswordConfirm = () => {
    if (userPasswordConfirm.value !== userPassword.value || userPasswordConfirm.value.length === 0) {
        const error = generateError('Значение должно совпадать с полем пароль');
        userPasswordConfirm.parentElement.appendChild(error);
    }   
};

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