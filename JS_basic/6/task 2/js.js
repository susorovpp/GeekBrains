"use strict";

const basket = {
    settings: {
        countSelector: '#basket-count',
        priceSelector: '#basket-price',
    },
    goods: [],
    countEl: null,
    priceEl: null,

    init(settings = {}) {
        this.countEl = document.querySelector(this.settings.countSelector);
        this.priceEl = document.querySelector(this.settings.priceSelector);
        
        this.initEventHandlers();
    },

    initEventHandlers() {
        const buttons = document.querySelectorAll('.buy-btn');

        buttons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const goodName = event.target.dataset.name;
                const goodPrice = event.target.dataset.price;

                this.add(goodName, goodPrice);
                this.render();
            })
        });
    },

    render() {
        this.countEl.textContent = this.goods.length;
        this.priceEl.textContent = this.getGoodsPrice(this.goods);
    },

    getGoodsPrice(arr) {
        return arr.reduce((acc, el) => acc + el.price, 0);
    },

    add(goodName, goodPrice) {
        this.goods.push({ ['price']: +goodPrice, ['name']: goodName})
    },
};

window.addEventListener('load', () => basket.init());