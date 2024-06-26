const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/zenithDB')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, match: [/\S+@\S+\.\S+/, 'is invalid'] },
    phone: { type: Number, required: true, validate: { validator: function(v) { return /\d{10}/.test(v); }, message: props => `${props.value} is not a valid phone number!` } }
});

const Contact = mongoose.model('Contact', contactSchema);

const reviewSchema = new mongoose.Schema({
    name: String,
    review: String,
    rating: Number,
});

const Review = mongoose.model('Review', reviewSchema, 'reviews');

const paymentSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    address: { type: String, required: true },
    cardname: { type: String, required: true },
    cardnumber: { type: String, required: true, match: [/^\d{4}-\d{4}-\d{4}-\d{4}$/, 'is invalid'] },
    expmonth: { type: String, required: true },
    expyear: { type: String, required: true },
    cvv: { type: String, required: true, match: [/^\d{3}$/, 'is invalid'] },
    items: [{ productId: mongoose.Schema.Types.ObjectId, name: String, price: Number, quantity: Number }],
    totalAmount: Number,
    status: String,
});

const Payment = mongoose.model('Payment', paymentSchema, 'payments');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageSrc: { type: String, required: true }
});
const Product = mongoose.model('Product', productSchema, 'add-to-cart');

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/zenith.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'zenith.css'));
});
app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});
app.get('/pay.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pay.html'));
});
app.get('/pay.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'pay.css'));
});
app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});
app.get('/admin.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.css'));
});

app.post('/contacts', (req, res) => {
    const newContact = new Contact(req.body);
    newContact.save()
        .then(savedContact => {
            res.status(201).json(savedContact);
        })
        .catch(err => {
            console.error('Error saving contact:', err);
            res.status(500).send('Error saving contact');
        });
});

app.post('/reviews', (req, res) => {
    const newReview = new Review({ name: req.body.name, review: req.body.review, rating: req.body.rating });
    newReview.save()
        .then(savedReview => {
            res.status(201).json(savedReview);
        })
        .catch(err => {
            console.error('Error saving review:', err);
            res.status(500).send('Error saving review');
        });
});

app.get('/reviews', (req, res) => {
    Review.find({})
        .then(reviews => {
            res.status(200).json(reviews);
        })
        .catch(err => {
            console.error('Error retrieving reviews:', err);
            res.status(500).send('Error retrieving reviews');
        });
});

// Payment endpoint
app.post('/payments', (req, res) => {
    const newPayment = new Payment(req.body);
    newPayment.save()
        .then(savedPayment => {
            res.status(201).json(savedPayment);
        })
        .catch(err => {
            console.error('Error saving payment:', err);
            res.status(500).send('Error saving payment');
        });
});

app.post('/add-to-cart', (req, res) => {
    const { name, price, imageSrc } = req.body;
    const newProduct = new Product({ name, price, imageSrc });

    newProduct.save()
        .then(savedProduct => {
            res.status(200).json(savedProduct);
        })
        .catch(err => {
            console.error('Error saving product:', err);
            res.status(500).send('Error saving product');
        });
});

app.get('/add-to-cart', (req, res) => {
    Product.find({})
        .then(cartItems => {
            res.status(200).json(cartItems);
        })
        .catch(err => {
            console.error('Error retrieving add to cart:', err);
            res.status(500).send('Error retrieving add to cart');
        });
});

app.delete('/add-to-cart/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
        const deletedProduct = await Product.findOneAndDelete({ _id: itemId });
        if (!deletedProduct) {
            return res.status(404).send('No product found');
        }
        res.send('Item deleted successfully');
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).send('Error deleting product');
    }
});

app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        console.error('Error retrieving contacts:', err);
        res.status(500).send('Error retrieving contacts');
    }
});


app.get('/payments', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (err) {
        console.error('Error retrieving payments:', err);
        res.status(500).send('Error retrieving payments');
    }
});

// Endpoint for cancelling an order
app.post('/payments/:id/cancel', (req, res) => {
    const paymentId = req.params.id;
    Payment.findByIdAndUpdate(paymentId, { status: 'cancelled' }, { new: true })
        .then(updatedPayment => res.json({ message: 'Order Cancelled', payment: updatedPayment }))
        .catch(error => res.status(500).json({ error: error.message }));
});

// Endpoint for completing an order
app.post('/payments/:id/complete', (req, res) => {
    const paymentId = req.params.id;
    Payment.findByIdAndUpdate(paymentId, { status: 'completed' }, { new: true })
        .then(updatedPayment => res.json({ message: 'Order Completed', payment: updatedPayment }))
        .catch(error => res.status(500).json({ error: error.message }));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
