"use strict";

/**
 * @property {Object} settings объект с настройками галереи
 * @property {string} settings.previewSelector селектор обертки для миниатюр галереи
 * @property {stirng} settings.openedImageWrapperClass класс для обертки открытой картинки
 * @property {stirng} settings.openedImageClass класс открытой картинки
 * @property {string} settings.openedImageScreenClass класс для ширмы открытой картинки (затемнение)
 * @property {string} settings.openedImageCloseBtnClass класс для картинки кнопки "закрыть"
 * @property {string} settings.openedImageCloseBtnSrc путь до картинки кнопки "закрыть"
 * @property {string} settings.errorImageSrc путь до картинки-заглушки в случае, если картинка в полном размере отсутствует
 * @property {string} settings.openedImageBtnNext класс для кноки "далее" в слайдере
 * @property {string} settings.openedImageBtnNextSrc путь до картинки для кноки "далее" в слайдере
 * @property {string} settings.openedImageBtnBack класс для кноки "назад" в слайдере
 * @property {string} settings.openedImageBtnBackSrc путь до картинки для кноки "назад" в слайдере
 * @property {HTMLElement} openedImageEl элемент открытой картинки-миниатюры
 */
const gallery = {
    settings: {
        previewSelector: '.mySuperGallery',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageCloseBtnSrc: 'images/gallery/close.png',
        errorImageSrc: 'images/gallery/imgError.jpg',
        openedImageBtnNext: 'galleryWrapper__next',
        openedImageBtnNextSrc: 'images/gallery/arrowNext.png',
        openedImageBtnBack: 'galleryWrapper__back',
        openedImageBtnBackSrc: 'images/gallery/arrowBack.png',
    },
    openedImageEl: null,

    /**
     * Инициализирует галерею, ставит обработчик события
     * @param {object} userSettings объект настроек для галереи
     */
    init(userSettings = {}) {
        // Записывает пользовательские настройки
        Object.assign(this.settings, userSettings);

        // Находим элемент, где будут превью картинок и ставим и ставим обработчик на этот элемент, при клике на этот элемент вызовем фугкцию containerClickHandler в нашем объекте gallery и передадим туда событие MouseEvent, которое случилось
        document
            .querySelector(this.settings.previewSelector)
            .addEventListener('click', event => this.containerClickHandler(event));
    },

    /**
     * Обработчик события клика для открытия картинки
     * @param {MouseEvent} event собитие клика мышью
     * @param {HTMLElement} event.target целевой объект куда был произведен клик
     */
    containerClickHandler(event) {
        // Если целевой тег не был картинкой, то ничего не делаем, просто завершаем функцию
        if (event.target.tagName !== "IMG") {
            return;
        }
        // Открываем картинку с url, полученным из целевого тега (атрибут dataset.full_image_url)
        this.openImage(event.target.dataset.full_image_url);
        // Помещаем целевой объект в свойство openedImageEl для запоминания миниатюры, на который был сделан клик (нужно для слайдера)
        this.openedImageEl = event.target;
    },

    /**
     * Открывает картинку
     * @param {string} src ссылка на картинку, которую надо открыть
     */
    openImage(src) {
        // Получаем контейнер для открытой картинки, в нем находим тег img и ставим ему нужный src
        this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = src;
    },

    /**
     * Возвращает контейнер для открытой картинки, либо создает контейнер, если его еще нет
     * @returns {Element}
     */
    getScreenContainer() {
        // Получаем контейнер для открытой картинки
        const galleryWraperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
        // Если контейнер для открытой картинки существует - возвращаем его
        if (galleryWraperElement) {
            return galleryWraperElement;
        }
        // Возвращаем полученный из метода createScreenContainer контейнер
        return this.createScreenContainer();
    },

    /**
     * Создает контейнер для открытой картинки
     * @returns {Element}
     */
    createScreenContainer() {
        // Создаем сам контейнер-обертку и ставим ему класс
        const galleryWraperElement = document.createElement('div');
        galleryWraperElement.classList.add(this.settings.openedImageWrapperClass);

        //Создаем кнопку переключения на следующую картинку с помощью метода createBtnArrowNext и добавляем ее в контейнер-обертку
        galleryWraperElement.appendChild(this.createBtnArrowNext());
        //Создаем кнопку переключения на предыдущую картинку с помощью метода    createBtnArrowPrev и добавляем ее в контейнер-обертку
        galleryWraperElement.appendChild(this.createBtnArrowPrev());

        // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку
        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWraperElement.appendChild(galleryScreenElement);

        // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем его в контейнер-обертку
        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWraperElement.appendChild(closeImageElement);

        // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку
        const image = new Image();
        image.classList.add(this.settings.openedImageClass);
        galleryWraperElement.appendChild(image);
        // Добавляем в свойство error для картинки с указанием пути к картинке-заглушке (если картинка, которую хотим открыть, отсутствует) 
        image.onerror = () => image.src = this.settings.errorImageSrc;
        // Добавляем контейнер-обертку в тег body
        document.body.appendChild(galleryWraperElement);
        // Возвращаем добавленный в body элемент, наш контейнер-обертку
        return galleryWraperElement;
    },

    /**
     * Закрывает (удаляет) контейнер для открытой картинки
     */
    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    },

    /**
     * Создает кнопку для переключения следующей картинки, добавляет картинку стрелку, src, описание. Также добавляется обрабочик события клика по кнопке с использованием метода getNextImage
     */
    createBtnArrowNext() {
        const imageArrowNext = new Image();
        imageArrowNext.classList.add(this.settings.openedImageBtnNext);
        imageArrowNext.src = this.settings.openedImageBtnNextSrc;
        imageArrowNext.alt = 'Вперед';

        imageArrowNext.addEventListener('click', () => {
            this.openedImageEl = this.getNextImage();
            this.openImage(this.openedImageEl.dataset.full_image_url);
        });
    },

    /**
     * Создает кнопку для переключения предыдущей картинки, добавляет картинку стрелку, src, описание. Также добавляется обрабочик события клика по кнопке с использованием метода getPrevImage
     */
    createBtnArrowPrev() {
        const imageArrowBack = new Image();
        imageArrowBack.classList.add(this.settings.openedImageBtnBack);
        imageArrowBack.src = this.settings.openedImageBtnBackSrc;
        imageArrowBack.alt = 'Назад';
        
        imageArrowBack.addEventListener('click', () => {
            this.openedImageEl = this.getPrevImage();
            this.openImage(this.openedImageEl.dataset.full_image_url);
        });
    },
    /**
     * Вовзращает следующий элемент (картинку) от открытой или первую картинку в контейнере если текущая открытая картинки последняя
     * @returns {Element} следующую картинку от текущей открытой
     */
    getNextImage() {
        const parentEl = this.openedImageEl.parentElement;
        const nextEl = this.openedImageEl.nextElementSibling;

        return nextEl === null ? parentEl.firstElementChild : nextEl;
    },

    /**
     * Вовзращает предыдущий элемент (картинку) от открытой или последнюю картинку в контейнере если текущая открытая картинки первая
     * @returns {Element} предыдущую картинку от текущей открытой
     */
    getPrevImage() {
        const parentEl = this.openedImageEl.parentElement;
        const prevtEl = this.openedImageEl.previousElementSibling;

        return prevtEl === null ? parentEl.lastElementChild : prevtEl;
    },
};

// Инициализируем нашу галерею при загрузке страницы.
window.onload = () => gallery.init({previewSelector: '.galleryPreviewsContainer'});