"use strict";

const gallery = {
    settings: {
        previewSelector: '.mySuperGallery',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageCloseBtnSrc: 'images/gallery/close.png',
        openedImageDataObject: null,
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
        this.getJsonObject(event.target.name);
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

        document.body.appendChild(galleryWraperElement);

        return galleryWraperElement;
    },

    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    },

    // ES5
    // getJsonObject(name) {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('GET', 'gallery.json', true);
    //     xhr.onreadystatechange = () => {
    //         if (xhr.readyState === 4 && xhr.status === 200) {
    //             JSON.parse(xhr.responseText).forEach(el => {
    //                 if (el.name === name) {
    //                     this.openImage(el.src);
    //                     document.querySelector(`.${this.settings.openedImageClass}`).setAttribute('alt', el.alt);
    //                 }
    //             })
    //         }
    //     };
    //     xhr.send();
    // },
    // ES6
    getJsonObject(name) {
        fetch('gallery.json')
            .then(result => result.json())
            .then(objects => {
                objects.forEach(el => {
                    if (el.name === name) {
                        this.openImage(el.src);
                        document.querySelector(`.${this.settings.openedImageClass}`).setAttribute('alt', el.alt);
                    }
                });
            })
    }
};
