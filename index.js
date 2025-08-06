const express = require('express');
const app = express();
const { User, Product, Order } = require('./models');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Populate with 2 users
User.create({ id: 1, name: 'Alice' });
User.create({ id: 2, name: 'Bob' });

// Populate with 2 products
Product.create({ id: 1, name: 'Laptop', price: 1200, stock_quantity: 10 });
Product.create({ id: 2, name: 'Phone', price: 800, stock_quantity: 20 });

app.post('/orders', (req, res) => { 
    const { user_id, product_id, quantity } = req.body;
    const product = Product.findById(product_id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    if (product?.stock_quantity < quantity) {
        return res.status(400).json({ error: 'Insufficient stock' });
    }
    // Create the order with status 'pending'

    const order1 = Order.create({
        id: 
        user_id, 
        product_id, 
        quantity, 
        status: 'pending'
    });
    // lock 
    // A - 5 -lock -3 -release
    // B - 5 -lock -sq=2 req-3 -release
    // map[order------]
    // Check if product exists and has enough stock
    if (product && product.stock_quantity >= quantity) {
        // Update order status to 'success'
        order1.status = 'success';
        // Deduct the quantity from product stock
        product.stock_quantity -= quantity;
    } else {
        // Update order status to 'failed'
        order1.status = 'failed';
    }
// release
    res.status(201).json(order1);
});

app.get('/orders', (req, res) => {
    const orders = Order.all();
    res.json(orders);
});

app.get('/orders/:id', (req, res) => {
    const { id } = req.params;
    const order = Order.findById(id);
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
});
