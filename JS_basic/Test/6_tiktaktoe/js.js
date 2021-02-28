"use strict";

const ticTakToe = {
    gameTableElement: null,
    status: 'playing',
    mapValues: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    phase: 'X',

    init () {
        this.gameTableElement = document.getElementById('game');
        this.renderMap();
        this.initEventHandlers();
    },

    renderMap() {
        for (let row = 0; row < 3; row += 1) {
            const tr = document.createElement('tr');
            this.gameTableElement.appendChild(tr);

            for (let col = 0; col < 3; col += 1) {
                const td = document.createElement('td');
                td.dataset.row = row;
                td.dataset.col = col;
                tr.appendChild(td);
            }
        }
    },

    initEventHandlers() {
        this.gameTableElement.addEventListener('click', event => this.cellClickHandler(event));
    },

    cellClickHandler(event) {
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;

        if (!this.isStatusPlaying() || !this.isClickByCell(event) || !this.isCellEmpty(row, col)) {
            return;
        }

        event.target.textContent = this.phase;
        this.mapValues[row][col] = this.phase;

        if (this.hasWon()) {
            this.setStatusStopped();
            this.sayWonPhase();
        }

        this.togglePhase();
    },

    isClickByCell(event) {
        return event.target.tagName === 'TD';
    },

    togglePhase() {
        this.phase = this.phase === 'X' ? 'O' : 'X';
    },

    isCellEmpty(row, col) {
        return this.mapValues[row][col] === '';
    },

    hasWon() {
        return this.isLineWon({col: 0, row: 0}, {col: 1, row: 0}, {col: 2, row: 0}) ||
            this.isLineWon({col: 0, row: 1}, {col: 1, row: 1}, {col: 2, row: 1}) ||
            this.isLineWon({col: 0, row: 2}, {col: 1, row: 2}, {col: 2, row: 2}) ||
            
            this.isLineWon({col: 0, row: 0}, {col: 0, row: 1}, {col: 0, row: 2}) ||
            this.isLineWon({col: 1, row: 0}, {col: 1, row: 1}, {col: 1, row: 2}) ||
            this.isLineWon({col: 2, row: 0}, {col: 2, row: 1}, {col: 2, row: 2}) ||
            
            this.isLineWon({col: 0, row: 0}, {col: 1, row: 1}, {col: 2, row: 2}) ||
            this.isLineWon({col: 0, row: 2}, {col: 1, row: 1}, {col: 2, row: 0});
    },

    isLineWon(a, b, c) {
        const value = this.mapValues[a.row][a.col] + this.mapValues[b.row][b.col] + this.mapValues[c.row][c.col];
        return value === 'XXX' || value === 'OOO';
    },

    isStatusPlaying() {
        return this.status === 'playing';
    },

    setStatusStopped() {
        this.status = 'stopped';
    },

    sayWonPhase() {
        const figure = this.phase === 'X' ? 'Крестики' : 'Нолики';
        setTimeout(alert, 1, `${figure} выиграли!`);
    },
};

window.addEventListener('load', () => ticTakToe.init());
