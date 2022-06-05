// function Product(name, price, screen, backCamera,frontCamera,img, desc, type, id, quantity ){
//     this.id = id;
//     this.name = name;
//     this.price = price;
//     this.screen = screen;
//     this.backCamera = backCamera;
//     this.frontCamera = frontCamera;
//     this.img = img;
//     this.desc = desc;
//     this.type = type;
//     this.quantity = quantity;
// }
class ProductList {
    constructor(name, price, screen, backCamera, frontCamera, img, type, id, quantity, desc) {
        this.name = name;
        this.price = price;
        this.screen = screen
        this.backCamera = backCamera
        this.frontCamera = frontCamera
        this.img = img;
        this.type = type;
        this.id = id;
        this.quantity = quantity;
        this.desc = desc;
    }
}