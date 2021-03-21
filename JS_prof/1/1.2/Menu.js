class Menu {
    constructor(id, className, items){
        this.id = id;
        this.className = className;
        this.items = items;
    }
    render() {
        let result = `<ul class="${this.className}" id="${this.id}">`;
        for (let i = 0; i < this.items.length; i++){
            if(this.items[i] instanceof MenuItem || this.items[i] instanceof SubMenu) {
                result += this.items[i].render()
            }
        }
        result += `</ul>`;

        return result
    }
    remove() {
        const menuBlock = document.getElementById(`${this.id}`);
        menuBlock.remove();
    }
    createRemoveButton() {
        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add = 'btn';
        buttonDelete.innerText = 'Удалить меню';
        document.body.appendChild(buttonDelete);

        buttonDelete.addEventListener('click', () => {
            this.remove();
            buttonDelete.remove();
        });
    }
}