document.addEventListener('DOMContentLoaded', function() {
    // Review Form Event Listener
    const submitButton = document.getElementById('submitBtn');
    const nameInput = document.getElementById('name');
    const reviewInput = document.getElementById('your-review');
    const ratingInput = document.getElementById('rating');

    if (submitButton && nameInput && reviewInput && ratingInput) {
        submitButton.addEventListener('click', function(event) {
            event.preventDefault();

            const name = nameInput.value.trim();
            const review = reviewInput.value.trim();
            const rating = ratingInput.value.trim();

            if (name && review && rating) {
                const reviewData = {
                    name: name,
                    review: review,
                    rating: parseInt(rating, 10)
                };

                fetch('/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reviewData)
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    console.log('Review added successfully:', data);
                    alert('Review added!');
                    document.getElementById('review-form').reset();

                    fetchReviews(); // Refresh reviews from the server
                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);
                });
            } else {
                alert('Please fill in all fields.');
            }
        });
    } else {
        console.error('One or more form elements not found!');
    }

    // Function to fetch reviews from the server and display them
    function fetchReviews() {
        fetch('/reviews')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(reviews => {
                displayReviews(reviews);
            })
            .catch(error => {
                console.error('There was a problem with fetching reviews:', error);
            });
    }

    // Function to display reviews on the webpage
    function displayReviews(reviews) {
        const reviewContainer = document.querySelector('.review .box-container');
        if (reviewContainer) {
            reviewContainer.innerHTML = ''; // Clear existing reviews
            reviews.forEach(review => {
                addReviewToContainer(reviewContainer, review.name, review.review, review.rating);
            });
        } else {
            console.error('Review container not found!');
        }
    }

    // Function to add a review to the review container
    function addReviewToContainer(container, name, review, rating) {
        const reviewBox = document.createElement('div');
        reviewBox.classList.add('review-box');
    
        // Create and append elements for the review box
        const reviewImg = document.createElement('img');
        reviewImg.src = 'images/review.png';
        reviewImg.alt = 'review';
        reviewImg.classList.add('review-comment');
        reviewBox.appendChild(reviewImg);
    
        const reviewText = document.createElement('p');
        reviewText.textContent = review;
        reviewBox.appendChild(reviewText);
    
        const userImg = document.createElement('img');
        userImg.src = 'images/user.png';
        userImg.alt = name;
        userImg.classList.add('user');
        reviewBox.appendChild(userImg);
    
        const userName = document.createElement('h3');
        userName.textContent = name;
        reviewBox.appendChild(userName);
    
        const starsDiv = document.createElement('div');
        starsDiv.classList.add('stars');
        for (let i = 0; i < rating; i++) {
            const starIcon = document.createElement('i');
            starIcon.classList.add('fas', 'fa-star');
            starsDiv.appendChild(starIcon);
        }
        reviewBox.appendChild(starsDiv);
    
        container.appendChild(reviewBox);
    }
    
    // Call function to fetch and display reviews on page load
    fetchReviews();
    // Contact Form Event Listener
    const contactButton = document.getElementById('contactButton');
    const nameInputContact = document.getElementById('contact-name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    if (contactButton && nameInputContact && emailInput && phoneInput) {
        contactButton.addEventListener('click', function(event) {
            event.preventDefault();

            const name = nameInputContact.value.trim();
            const email = emailInput.value.trim();
            const phone = phoneInput.value.trim();

            if (name && email && phone) {
                const contactData = {
                    name: name,
                    email: email,
                    phone: phone
                };

                fetch('/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contactData)
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    console.log('Contact details added successfully:', data);
                    alert('Your contact details have been submitted successfully!');
                    document.querySelector('.contact form').reset();
                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);
                    alert('Please enter valid values!');
                });
            } else {
                alert('Please fill out all fields before submitting.');
            }
        });
    } else {
        console.error('One or more form elements not found!');
    }

    // Payment Form Event Listener
    const paymentButton = document.getElementById('paymentBtn');
    const totalAmountElement = document.getElementById('totalAmount');
    const nameInputPayment = document.getElementById('fname');
    const addressInput = document.getElementById('adr');
    const cardnameInput = document.getElementById('cname');
    const cardnumberInput = document.getElementById('ccnum');
    const expmonthInput = document.getElementById('expmonth');
    const expyearInput = document.getElementById('expyear');
    const cvvInput = document.getElementById('cvv');
    

    if (paymentButton && nameInputPayment && addressInput && cardnameInput && cardnumberInput && expmonthInput && expyearInput && cvvInput) {
        paymentButton.addEventListener('click', function(event) {
            event.preventDefault();

            const firstname = nameInputPayment.value.trim();
            const address = addressInput.value.trim();
            const cardname = cardnameInput.value.trim();
            const cardnumber = cardnumberInput.value.trim();
            const expmonth = parseInt(expmonthInput.value.trim(), 10);
            const expyear = parseInt(expyearInput.value.trim(), 10);
            const cvv = cvvInput.value.trim();

            // Additional validations
            if (expmonth < 1 || expmonth > 12) {
                alert('Expiration month must be between 1 and 12');
                return;
            }

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // Aylar 0-11 arasında olduğu için 1 eklenir
            const currentYear = currentDate.getFullYear() % 100; // son iki rakamı
            if (expyear < currentYear) {
                alert('Expiration year must be this year or in the future');
                return;
            } else if (expyear === currentYear && expmonth < currentMonth) {
                alert('Expiration month must be this month or in the future');
                return;
            }

            fetch('/add-to-cart')
                .then(response => response.json())
                .then(cartItems => {
                    const items = cartItems.map(item => ({
                        productId: item._id,
                        name: item.name,
                        price: item.price,
                        quantity: 1
                    }));

                    const totalAmount = items.reduce((acc, item) => acc + item.price, 0);

                    fetch('/payments', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            firstname: firstname,
                            address: address,
                            cardname: cardname,
                            cardnumber: cardnumber,
                            expmonth: expmonth,
                            expyear: expyear,
                            cvv: cvv,
                            items: items,
                            totalAmount: totalAmount
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Payment successful:', data);
                        alert('Payment successful!');
                        document.getElementById('payment-form').reset();
                    })
                    .catch(error => {
                        console.error('Error during payment:', error);
                        alert('Error during payment. Please try again.');
                    });
                })
                .catch(error => {
                    console.error('Error fetching cart items:', error);
                });
        });
    } else {
        console.error('One or more form elements not found!');
    }
    
    // Function to fetch cart items and calculate total amount
    function calculateTotalAmount() {
        fetch('/add-to-cart') // Endpoint to fetch cart items
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(cartItems => {
                const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
                totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }

    // Call the function to calculate and display total amount
    calculateTotalAmount();
    // Cart Functionality Event Listeners
    const cartIcon = document.getElementById('cart-shopping');
    const cartItemsContainer = document.querySelector('.cart-items-container');

    function saveProductToDatabase(productName, price, imageSrc) {
        const productData = {
            name: productName,
            price: price,
            imageSrc: imageSrc
        };

        fetch('/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('Product added to database successfully:', data);
            fetchCartItems(); // Refresh cart items when added
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            alert('Error saving product to database: Please try again.');
        });
    }

    function fetchCartItems() {
        fetch('/add-to-cart')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                cartItemsContainer.innerHTML = ''; // Clear previous contents

                data.forEach(item => {
                    addToCart(cartItemsContainer, item._id, item.name, item.price, item.imageSrc); // item._id used for identification
                });

                addPurchaseButton(cartItemsContainer);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }

    function addToCart(container, id, productName, price, imageSrc) {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.dataset.id = id; // Set data attribute for identification

        const div = document.createElement('div');
        div.style.textAlign = 'center';

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = productName;
        div.appendChild(img);

        const span = document.createElement('span');
        span.textContent = `${productName} - $${price.toFixed(2)}`;
        span.style.fontSize = '20px';
        span.style.display = 'block';
        div.appendChild(span);

        li.appendChild(div);

        // Trash icon for deleting item
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fas', 'fa-trash', 'trash-icon');
        trashIcon.addEventListener('click', function() {
            const itemId = li.dataset.id; // Get item id
            deleteCartItem(itemId); // Delete the item
        });
        li.appendChild(trashIcon);

        container.appendChild(li);
    }

    function deleteCartItem(itemId) {
        console.log(`Attempting to delete item with ID: ${itemId}`); // Log the ID
        fetch(`/add-to-cart/${itemId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (response.ok) return response.text();
            throw new Error('Network response was not ok.');
        })
        .then(message => {
            console.log(message); // Log success message
            fetchCartItems(); // Update cart after deletion
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            alert('Error deleting item from cart: Please try again.');
        });
    }

    function addPurchaseButton(container) {
        const purchaseButton = document.createElement('button');
        purchaseButton.textContent = 'Pay';
        purchaseButton.classList.add('purchase-button');

        purchaseButton.addEventListener('click', function() {
            window.location.href = 'pay.html'; // Redirect to payment page
        });

        container.appendChild(purchaseButton);
    }

    function animateCart() {
        cartIcon.style.transform = 'scale(1.5)';
        setTimeout(function() {
            cartIcon.style.transform = 'scale(1)';
        }, 500);
    }

    const addToCartButtons = document.querySelectorAll('.generally-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentNode.parentNode.querySelector('h3').textContent.trim();
            const productPrice = parseFloat(this.parentNode.parentNode.querySelector('.price').textContent.replace('$', '').split('\n')[0]);
            const productImageSrc = this.parentNode.parentNode.querySelector('img').getAttribute('src');
            console.log(productName, productPrice, productImageSrc); // Log for verification
            saveProductToDatabase(productName, productPrice, productImageSrc);
            animateCart(); // Run animation when adding to cart
        });
    });

    cartIcon.addEventListener('click', function(event) {
        event.stopPropagation(); // Stop event bubbling upwards
        cartItemsContainer.classList.toggle('active'); // Toggle cart visibility
        if (cartItemsContainer.classList.contains('active')) {
            fetchCartItems(); // Fetch data when cart is visible
        }
    });

    // Hide cart when clicking anywhere on the page except the cart itself
    document.addEventListener('click', function(event) {
        if (!cartItemsContainer.contains(event.target) && !cartIcon.contains(event.target)) {
            cartItemsContainer.classList.remove('active');
        }
    });

    // Prevent cart from hiding when clicking inside the cart
    cartItemsContainer.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Fetch cart items on page load
    fetchCartItems();

    // Mobile Menu Event Listener
    const barsButton = document.getElementById('bars');
    const navbar = document.querySelector('.navbar');

    barsButton.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && !e.target.closest('#bars')) {
            navbar.classList.remove('active');
        }
    });

    // Scroll Reveal Initialization
    const ScrollRevealOption = {
        duration: 1000,
        easing: 'ease-in-out',
        reset: true
    };

    ScrollReveal().reveal(".home .content", {
        ...ScrollRevealOption,
        interval: 400,
    });

    ScrollReveal().reveal(".menu ", {
        ...ScrollRevealOption,
        interval: 200,
    });

    ScrollReveal().reveal(".about ", {
        ...ScrollRevealOption,
        interval: 200,
    });

    // Auto-Play Video
    window.onload = function() {
        var video = document.getElementById("about-Video");
        if (video) {
            video.play(); 
            video.addEventListener('ended', function() { 
                this.currentTime = 0; 
                this.play(); 
            }, false);
        } else {
            console.error("Video element not found!");
        }
    };
});
document.addEventListener('DOMContentLoaded', function() {
    const paymentsTable = document.getElementById('payments-body');

    function fetchPayments() {
        fetch('/payments')
            .then(response => response.json())
            .then(payments => displayPayments(payments))
            .catch(error => console.error('There was a problem with fetching payments:', error));
    }

    function displayPayments(payments) {
        paymentsTable.innerHTML = ''; // Clear previous data

        payments.forEach(payment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${payment.firstname}</td>
                <td>${payment.address}</td>
                <td>${formatItems(payment.items)}</td>
                <td>${payment.totalAmount.toFixed(2)}</td>
                <td>
                    <button class="cancel-btn" data-id="${payment._id}" ${payment.status === 'cancelled' ? 'disabled' : ''}>Order Cancelled</button>
                    <button class="complete-btn" data-id="${payment._id}" ${payment.status === 'completed' ? 'disabled' : ''}>Order Completed</button>
                </td>
            `;
            if (payment.status === 'cancelled') {
                row.children[row.children.length - 1].textContent = 'Order Cancelled';
                row.children[row.children.length - 1].style.color = 'red';
            } else if (payment.status === 'completed') {
                row.children[row.children.length - 1].textContent = 'Order Completed';
                row.children[row.children.length - 1].style.color = 'green';
            }
            paymentsTable.appendChild(row);
        });
    }

    function formatItems(items) {
        return items.map(item => `${item.name} - $${item.price}`).join('<br>');
    }

    fetchPayments();
    setInterval(fetchPayments, 30000); // 30 seconds

    paymentsTable.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('cancel-btn')) {
            handleCancelOrder(target);
        } else if (target.classList.contains('complete-btn')) {
            handleCompleteOrder(target);
        }
    });

    function handleCancelOrder(button) {
        const paymentId = button.dataset.id;
        fetch(`/payments/${paymentId}/cancel`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(result => {
            console.log(result.message);
            fetchPayments(); // Refresh payments after cancelling
        })
        .catch(error => console.error('There was a problem with cancelling the order:', error));
    }

    function handleCompleteOrder(button) {
        const paymentId = button.dataset.id;
        fetch(`/payments/${paymentId}/complete`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(result => {
            console.log(result.message);
            fetchPayments(); // Refresh payments after completing
        })
        .catch(error => console.error('There was a problem with completing the order:', error));
    }
});

document.querySelectorAll('.cancel-btn').forEach(button => {
    button.addEventListener('click', () => {
        updatePaymentStatus(button.dataset.id, 'cancelled');
    });
});

document.querySelectorAll('.complete-btn').forEach(button => {
    button.addEventListener('click', () => {
        updatePaymentStatus(button.dataset.id, 'completed');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    fetchPayments();
    fetchContacts();
});

function fetchPayments() {
    fetch('/payments')
        .then(response => response.json())
        .then(data => {
            displayPayments(data);
        })
        .catch(error => {
            console.error('Error fetching payments:', error);
        });
}

function fetchContacts() {
    fetch('/contacts')
        .then(response => response.json())
        .then(data => {
            displayContacts(data);
        })
        .catch(error => {
            console.error('Error fetching contacts:', error);
        });
}

function displayContacts(contacts) {
    const contactsTableBody = document.getElementById('contactsTableBody');
    contactsTableBody.innerHTML = '';

    contacts.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
        `;
        contactsTableBody.appendChild(row);
    });
}

function updatePaymentStatus(paymentId, status) {
    fetch(`/payments/${paymentId}/${status}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            fetchPayments();
        })
        .catch(error => {
            console.error('Error updating payment status:', error);
        });
}
