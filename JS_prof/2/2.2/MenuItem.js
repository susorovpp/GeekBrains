class MenuItem {
    constructor(href, title, className){
        this.href = href;
        this.title = title;
        this.class = className;
    }
    render() {
        return `<li><a class="${this.class}" href="${this.href}">${this.title}</a></li>`;
    }
}