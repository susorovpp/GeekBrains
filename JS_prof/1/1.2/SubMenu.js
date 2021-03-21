class SubMenu extends Menu {
    constructor(id, className, items, href, title) {
        super(id, className, items);
        this.href = href;
        this.title = title;
    }
    render() {
        return `<li><a href="${this.href}">${this.title}</a>${super.render()}</li>`
    };
}