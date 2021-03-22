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
    render() {
        // Вношу все элементы в свойство items
        this.getInputElements();
        // Вношу cal и price в свойства класса
        this.getCalAndPrice();
        // Нахожу элементы, в которые нужно внести установленные значения свойств cal и price
        const totalCal = document.getElementById('totalCal');
        const totalPrice = document.getElementById('totalPrice');
        
        totalCal.innerText = this.cal;
        totalPrice.innerText = this.price;
    }
    /**
     * Метод выполняет поиск всех input элементов, формирование в виде массива и записывает найденный массив в свойство items
     */
    getInputElements() {
        // Получаю dom-элементы input
        const inputElements = Array.from(document.querySelectorAll('input'));
        // Удаляю последний элемент, т.к. это кнопка "Собрать бургер"
        inputElements.splice(inputElements.length - 1, 1);
        // Сортировка массива - выбираются только те элементы, у которых параметр checked = true
        const inputsElementsChecked = inputElements.filter((input) => input.checked === true);
        // Устанавливаю найденный массив в свойство items
        this.items = inputsElementsChecked;
    }
    /**
     * Метод подсчитывает количество калорий и стоимость собранного бургера, а также устанавливает калории и стоимость в свойства класса
     */
    getCalAndPrice() {
        // Устанавливаю начальное значение для суммы cal и price
        let sumCal = 0;
        let sumPrice = 0;
        // Создаю цикл для подсчета калорий и стоимости бургера всех элементов items с выделением значений из атрибутов data
        for (let i = 0; i < this.items.length; i++) {
            sumCal += +this.items[i].dataset.cal;
            sumPrice += +this.items[i].dataset.price;
        }
        // Устанавливаю полученную сумму калорий и стоимость в свойства класса cal и price
        this.cal = sumCal;
        this.price = sumPrice;
    }
}