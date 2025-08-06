// In-memory storage classes

class User {
    static data = [];

    constructor({ id, name }) {
        this.id = id;
        this.name = name;
    }

    static create(userObj) {
        const user = new User(userObj);
        User.data.push(user);
        return user;
    }

    static findById(id) {
        return User.data.find(u => u.id === id);
    }

    static all() {
        return [...User.data];
    }
}

class Product {
    static data = [];

    constructor({ id, name, price, stock_quantity }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock_quantity = stock_quantity;
    }

    static create(productObj) {
        const product = new Product(productObj);
        Product.data.push(product);
        return product;
    }

    static findById(id) {
        return Product.data.find(p => p.id === id);
    }

    static all() {
        return [...Product.data];
    }
}

class Order {
    static data = [];

    constructor({ id, user_id, product_id, quantity, status, created_at }) {
        this.id = id;
        this.user_id = user_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.status = status;
        this.created_at = created_at || new Date();
    }

    static create(orderObj) {
        const order = new Order(orderObj);
        Order.data.push(order);
        return order;
    }

    static findById(id) {
        return Order.data.find(o => o.id === id);
    }

    static all() {
        return [...Order.data];
    }
}

module.exports = { User, Product, Order };