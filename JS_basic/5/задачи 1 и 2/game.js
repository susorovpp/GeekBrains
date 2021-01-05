"use strict";

const settings = {
    rowsCount: 10,
    colsCount: 10,
};

const chess = {
    settings,
    figures: [
        {name: 'r', color: 'b', pos: '11'},
        {name: 'k', color: 'b', pos: '12'},
        {name: 'b', color: 'b', pos: '13'},
        {name: 'Q', color: 'b', pos: '14'},
        {name: 'K', color: 'b', pos: '15'},
        {name: 'b', color: 'b', pos: '16'},
        {name: 'k', color: 'b', pos: '17'},
        {name: 'r', color: 'b', pos: '18'},
        {name: 'p', color: 'b', pos: '21'},
        {name: 'p', color: 'b', pos: '22'},
        {name: 'p', color: 'b', pos: '23'},
        {name: 'p', color: 'b', pos: '24'},
        {name: 'p', color: 'b', pos: '25'},
        {name: 'p', color: 'b', pos: '26'},
        {name: 'p', color: 'b', pos: '27'},
        {name: 'p', color: 'b', pos: '28'},
        {name: 'p', color: 'w', pos: '71'},
        {name: 'p', color: 'w', pos: '72'},
        {name: 'p', color: 'w', pos: '73'},
        {name: 'p', color: 'w', pos: '74'},
        {name: 'p', color: 'w', pos: '75'},
        {name: 'p', color: 'w', pos: '76'},
        {name: 'p', color: 'w', pos: '77'},
        {name: 'p', color: 'w', pos: '78'},
        {name: 'r', color: 'w', pos: '81'},
        {name: 'k', color: 'w', pos: '82'},
        {name: 'b', color: 'w', pos: '83'},
        {name: 'Q', color: 'w', pos: '84'},
        {name: 'K', color: 'w', pos: '85'},
        {name: 'b', color: 'w', pos: '86'},
        {name: 'k', color: 'w', pos: '87'},
        {name: 'r', color: 'w', pos: '88'},
    ],

    figureHtml: {
        pw: '&#9817;',
        bw: '&#9815;',
        rw: '&#9814;',
        kw: '&#9816;',
        Kw: '&#9812;',
        Qw: '&#9813;',
        pb: '&#9823;',
        bb: '&#9821;',
        rb: '&#9820;',
        kb: '&#9822;',
        Kb: '&#9818;',
        Qb: '&#9819;',
    },

    /**
     * @property {HTMLElement} gameContainerEI контейнер игры (DOM элемент)
     */
    gameContainerEI: document.getElementById('game'),

    /**
     * Метод отображения карты (игрового поля)
     */
    renderMap() {
        // Названия колонок
        const cols = [0, 'a', 'b','c','d','e','f','g','h', 0];
        const rows = [0, '8', '7','6','5','4','3','2','1', 0];

        // Цикл для строк
        for (let row = 0; row < this.settings.rowsCount; row += 1) {
            // Создаем и добавляем строку
            const tr = document.createElement('tr');
            this.gameContainerEI.appendChild(tr);

            // Добавляем ячейки в строку
            for (let col = 0; col < this.settings.colsCount; col += 1) {
                // Создаем и добавляем ячейку
                const td = document.createElement('td');
                tr.appendChild(td);

                //Присваиваем атрибут для того, чтобы разместить шахматные фигуры
                td.setAttribute('data-position', `${row}${col}`)

                // Если строка нулевая (первая по счету) или последняя, значит выводим буквы к ней.
                // Нули из массива с названием колонок не выводим, они нам не нужны
                if ((row === 0 && cols[col] !== 0) ||
                    (row === this.settings.rowsCount - 1 && cols[col] !== 0)) {
                    td.innerHTML = cols[col];
                }

                // Если колонка нулевая (первая по счету) или последняя, значит выводим цифры к ней.
                // Нули из массива с названием строк не выводим, они нам не нужны
                if ((col === 0 && rows[row] !== 0) ||
                    (col === this.settings.colsCount - 1 && rows[row] !== 0)) {
                    td.innerHTML = rows[row];
                }

                // Проверяем нужно ли покрасить ячейку, передаем строку и колонку
                if (this.isCellsBlack(row, col)) {
                    td.style.backgroundColor = 'grey';
                }
            }
        }
    },

    /**
     * Определяет является ли ячейка черной
     * @param {int} rowNum номер в строке
     * @param {int} colNUm номер в колонке
     * @returns {boolean} true, если ячейка должна быть черной, иначе false
     */
    isCellsBlack(rowNum, colNum) {
        if (rowNum === 0 || rowNum === this.settings.rowsCount - 1 ||
            colNum === 0 || colNum === this.settings.colsCount - 1) {
            return false;
        }

        if (!(rowNum % 2) && colNum % 2 ||
            (rowNum % 2 && !(colNum % 2))) {
                return true;
            }
        
        return false;
    },

    // Метод просто для вывода фигур.
    renderFigure() {
        
        for (let i = 0; i < this.figures.length; i += 1) {
            console.log(i)
            // Берем одну фигуру
            const figure = this.figures[i];
            // Получаем имя фигуры и цвет в одну строку
            const figureHtmlProperty = figure.name + figure.color;
            // Получаем код фигуры из this.figureHtml используя строку из названия фигуры и ее цвета
            const figureCode = this.figureHtml[figureHtmlProperty];
            //Вставляем в ячейку
            const figurePosition = figure.pos;
            //Находим нужную ячейку по координате
            const td = document.querySelector(`td[data-position="${figurePosition}"]`);
            //Вставляем соответствующий код фигуры в найденную ячейку
            td.innerHTML = figureCode;
        }
    },

};

//Запускаем метод отображения карты
chess.renderMap();
chess.renderFigure();