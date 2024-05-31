const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/zenithDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    phone: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
});

const Contact = mongoose.model('Contact', contactSchema);

const reviewSchema = new mongoose.Schema({
    name: String,
    review: String,
    rating: Number,
});

const Review = mongoose.model('Review', reviewSchema, 'reviews');

const paymentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cardname: {
        type: String,
        required: true
    },
    cardnumber: {
        type: String,
        required: true,
        match: [/^\d{4}-\d{4}-\d{4}-\d{4}$/, 'is invalid']
    },
    expmonth: {
        type: String,
        required: true
    },
    expyear: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true,
        match: [/^\d{3}$/, 'is invalid']
    }
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
    const newReview = new Review({
        name: req.body.name,
        review: req.body.review,
        rating: req.body.rating,
    });

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

// Sepet verilerini alma endpoint'i
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
    console.log(`Attempting to delete item with ID: ${itemId}`); // Silme işlemi için ID'yi logla
    
    try {
        const deletedProduct = await Product.findOneAndDelete({ _id: itemId });
        if (!deletedProduct) {
            console.error('No product found with ID:', itemId);
            return res.status(404).send('No product found');
        }
        
        console.log('Deleted product:', deletedProduct);
        res.send('Item deleted successfully');
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).send('Error deleting product');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
