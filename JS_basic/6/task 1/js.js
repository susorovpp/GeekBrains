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
    },

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
};
