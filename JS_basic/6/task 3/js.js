"use strict";

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

    init(userSettings = {}) {
        Object.assign(this.settings, userSettings);

        document
            .querySelector(this.settings.previewSelector)
            .addEventListener('click', event => this.containerClickHandler(event));
    },

    containerClickHandler(event) {
        if (event.target.tagName !== "IMG") {
            return;
        }

        this.openImage(event.target.dataset.full_image_url);
        this.openedImageEl = event.target;
    },

    openImage(src) {
        this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = src;
    },

    getScreenContainer() {
        const galleryWraperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);

        if (galleryWraperElement) {
            return galleryWraperElement;
        }

        return this.createScreenContainer();
    },

    createScreenContainer() {
        const galleryWraperElement = document.createElement('div');
        galleryWraperElement.classList.add(this.settings.openedImageWrapperClass);

        const imageArrowNext = new Image();
        imageArrowNext.classList.add(this.settings.openedImageBtnNext);
        imageArrowNext.src = this.settings.openedImageBtnNextSrc;
        imageArrowNext.alt = 'Вперед';
        imageArrowNext.addEventListener('click', () => {
            this.openedImageEl = this.getNextImage();
            this.openImage(this.openedImageEl.dataset.full_image_url);
        });

        galleryWraperElement.appendChild(imageArrowNext);

        const imageArrowBack = new Image();
        imageArrowBack.classList.add(this.settings.openedImageBtnBack);
        imageArrowBack.src = this.settings.openedImageBtnBackSrc;
        imageArrowBack.alt = 'Назад';
        imageArrowBack.addEventListener('click', () => {
            this.openedImageEl = this.getPrevImage();
            this.openImage(this.openedImageEl.dataset.full_image_url);
        });

        galleryWraperElement.appendChild(imageArrowBack);

        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);

        galleryWraperElement.appendChild(galleryScreenElement);

        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());

        galleryWraperElement.appendChild(closeImageElement);

        const image = new Image();
        image.classList.add(this.settings.openedImageClass);
        galleryWraperElement.appendChild(image);

        image.onerror = () => image.src = this.settings.errorImageSrc;

        document.body.appendChild(galleryWraperElement);

        return galleryWraperElement;
    },

    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    },

    getNextImage() {
        const parentEl = this.openedImageEl.parentElement;
        const nextEl = this.openedImageEl.nextElementSibling;

        return nextEl === null ? parentEl.firstElementChild : nextEl;
    },

    getPrevImage() {
        const parentEl = this.openedImageEl.parentElement;
        const prevtEl = this.openedImageEl.previousElementSibling;

        return prevtEl === null ? parentEl.lastElementChild : prevtEl;
    },
};
