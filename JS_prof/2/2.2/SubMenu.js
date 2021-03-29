class SubMenu extends Menu {
    constructor(id, className, items, href, title, classNameElLink) {
        super(id, className, items);
        this.href = href;
        this.title = title;
        this.classNameElLink = classNameElLink;
    }
    render() {
        return `<li><a class="${this.classNameElLink}" href="${this.href}">${this.title}</a>${super.render()}</li>`
    };
}