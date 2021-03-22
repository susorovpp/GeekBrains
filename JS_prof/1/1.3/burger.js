/**
 * Класс для подсчета каллорий и цены собранного продукта
 */

class calculateCalAndPrice {
    /**
     * Конструктор, устанавливающий свойства объекта
     * @param {Array} items массив с элементами input, в которых указаны выбранные размер, начинка и доп опции
     * @param {Number} cal количество каллорий собранного гамбургера
     * @param {Number} price стоимость собранного гамбургера
     */
    constructor () {
        this.items = null;
        this.cal = null;
        this.price = null;
    }
    /**
     * Метод, который выводит количество калорий и цену собранного бургера
     */
    visual() {
        // Устанавливаю элементы input в свойство items
        this.__setInputElements(this.__getInputElements());
        // Устанавливаю сумму калорий и стоимость в свойства класса
        this.__setCal(this.__getCal(this.items));
        this.__setPrice(this.__getPrice(this.items));
        // Нахожу элементы, в которые нужно внести установленные значения свойств cal и price
        const totalCal = document.getElementById('totalCal');
        const totalPrice = document.getElementById('totalPrice');
        
        totalCal.innerText = this.cal;
        totalPrice.innerText = this.price;
    }
    /**
     * Метод выполняет поиск всех input элементов, формирование в виде массива и фильтрацию input элементов со статусом checked = true
     * @returns {Array} возвращает массив всех input элементов
     */
    __getInputElements() {
        // Получаю dom-элементы input
        const inputElements = Array.from(document.querySelectorAll('input'));
        // Возвращаю отсортированный массив - выбираются только те элементы, у которых параметр checked = true
        return inputElements.filter((input) => input.checked === true);
    }
    /**
     * Метод метод устанавливает входящий массив в свойство items
     * @param {Array} inputElements массив input элементов
     */
    __setInputElements(inputElements) {
        this.items = inputElements;
    }
    /**
     * Метод извлекает сумму калорий из передаваемого массива элементов input
     * @param {Array} items массив input элементов
     */
    __getCal(items) {
        return items.reduce((sum, item) => sum + Number(item.dataset.cal), 0);
    }
    /**
     * Метод извлекает суммарную стоимость из передаваемого массива элементов input
     * @param {Array} items массив input элементов
     */
    __getPrice(items) {
        return items.reduce((sum, item) => sum + Number(item.dataset.price), 0);
    }
    /**
     * Метод устанавливает калории в свойства класса
     * @param {Number} cal количество каллорий
     */
    __setCal(cal) {
        this.cal = cal;
    }
    /**
     * Метод устанавливает калории в свойства класса
     * @param {Number} price стоимость
     */
    __setPrice(price) {
        this.price = price;
    }
}