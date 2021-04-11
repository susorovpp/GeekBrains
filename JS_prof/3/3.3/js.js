/**
 * Класс для валидации формы
 */
class Form {
    // Создаем объекты для каждого поля input и передаем в него шаблон для регулярного выражения, текст, который будет выводиться, если будет ошибка, и id поля
    constructor(regExpName, regExpPhone, regExpMail) {
        this.name = new ElementInfo(regExpName, 'Имя должно содержать только буквы', 'name');
        this.phone = new ElementInfo(regExpPhone, 'Введите номер телефона в формате +7(000)000-0000', 'phone');
        this.mail = new ElementInfo(regExpMail, 'Введите адрес электронной почты в формате mymail@mail.ru', 'mail');
    }

    /**
     * Метод инициализирует валидацию
     */
    init() {
        //Удаляем все блоки с ошибками
        this._removeError();
        //Проверяем каждое поле на соответствие
        this._validateElement(this.name);
        this._validateElement(this.phone);
        this._validateElement(this.mail);
    }
    /**
     * Метод проверяет валидно ли поле, если не валидно, то выводит ошибку
     * @param {Object} field поле, которое хотим проверить
     */
    _validateElement(field) {
        //Проверяем подходит ли значение, введенное в поле, переданному шаблону
        if (this._validateValue(field.regExp, this._getValue(field.id))) {
            document.getElementById(`${field.id}`).classList.add('success');
            return;
        };
        //Если не подходит, то добавляет в DOM блок с ошибкой
        return this._addErrorField(this._generateError(field.textError), field.id);
    }

    /**
     * Метод находит input элемент с переданным id и возвращает значение, введенное пользователем в данное поле input
     * @param {string} id поле, у которого хотим найти значение
     * @returns {string} значение, которое пользователь ввел в поле
     */
    _getValue(id) {
        const el = document.getElementById(`${id}`);
        return el.value;
    }

    /**
     * Метод проверяет соответствие введенного пользователем значение шаблону регулярного выражения
     * @param {Object} regExp шаблон регулярного выражения
     * @param {string} value введенное пользователем значение
     * @returns {boolean} возвращает true, если значение поля удовлетворяет шаблону
     */
    _validateValue(regExp, value) {
        return regExp.test(value);
    }

    /**
     * Метод, который добавляет поле ошибки в DOM
     * @param {HTMLElement} element элемент, который нужно добавить в DOM
     * @param {string} id id элемента, после которого нужно вставить блок с ошибкой
     */
    _addErrorField(element, id) {
        const inputEl = document.getElementById(`${id}`);
        inputEl.classList.add('failure');
        inputEl.parentElement.appendChild(element);
    }

    /**
     * Метод создает блок с сообщением об ошибке
     * @param {string} text текст ошибки
     * @returns {HTMLElement} блок с ошибкой
     */
    _generateError(text) {
        // Создаем блок div
        const error = document.createElement('div');
        // Добавляем блоку класс error и текст ошибки
        error.className = 'error';
        error.innerText = text;
        return error;
    }

    /**
     * Метод ищет все блоки с ошибками и удаляет их
     */
    _removeError() {
        // Находим все элементы с классом error
        const errors = document.querySelectorAll('.error');
        // Проходимся циклом и удаляем каждый элемент
        for (const error of errors) {
            error.remove();
        }
    }
}

/**
 * Класс для создания информации об элементе, содержащей шаблон регулярного выражения, текст ошибки, id элемента
 */
class ElementInfo {
    constructor(regExp, textError, id) {
        this.regExp = regExp;
        this.textError = textError;
        this.id = id;
    }
}