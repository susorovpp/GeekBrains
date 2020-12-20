"use strict";

const settings = {
    rowsCount: 10,
    colsCount: 10,
    // startPositionX: 0,
    // startPositionY: 0,
    // startDirection: 'right',
    // stepsInSeconds: 5,
    // playerCellColor: '#AA3333',
    // emptyCellColor: '#EEEEEE',
};

const chess = {
    settings,

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
};

//Запускаем метод отображения карты
chess.renderMap();