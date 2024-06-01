document.addEventListener('DOMContentLoaded', function() {
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
                    // Clear the form
                    document.getElementById('review-form').reset();

                    // Refresh reviews from the server
                    fetchReviews();
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

    // Call function to fetch and display reviews on page load
    fetchReviews();

    
});

function addReviewToContainer(container, name, review, rating) {
    const reviewBox = document.createElement('div');
    reviewBox.classList.add('review-box');

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


document.addEventListener('DOMContentLoaded', function() {
    const contactButton = document.getElementById('contactButton');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    if (contactButton && nameInput && emailInput && phoneInput) {
        contactButton.addEventListener('click', function(event) {
            event.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const phone = phoneInput.value.trim();

            if (name !== '' && email !== '' && phone !== '') {
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
});
document.addEventListener('DOMContentLoaded', function() {
    const paymentButton = document.getElementById('paymentBtn');
    const nameInput = document.getElementById('fname');
    const addressInput = document.getElementById('adr');
    const cardnameInput = document.getElementById('cname');
    const cardnumberInput = document.getElementById('ccnum');
    const expmonthInput = document.getElementById('expmonth');
    const expyearInput = document.getElementById('expyear');
    const cvvInput = document.getElementById('cvv');

    if (paymentButton && nameInput && addressInput && cardnameInput && cardnumberInput && expmonthInput && expyearInput && cvvInput) {
        paymentButton.addEventListener('click', function(event) {
            event.preventDefault();

            const name = nameInput.value.trim();
            const address = addressInput.value.trim();
            const cardname = cardnameInput.value.trim();
            const cardnumber = cardnumberInput.value.trim();
            const expmonth = expmonthInput.value.trim();
            const expyear = expyearInput.value.trim();
            const cvv = cvvInput.value.trim();

            // Ek Doğrulamalar
            if (expmonth < 1 || expmonth > 12) {
                alert('Expiration month must be between 1 and 12');
                return;
            }

            const currentYear = new Date().getFullYear() % 100; // Son iki haneli yıl
            if (expyear < currentYear) {
                alert('Expiration year must be this year or in the future');
                return;
            }

            if (name && address && cardname && cardnumber && expmonth && expyear && cvv) {
                const paymentData = {
                    firstname: name,
                    address: address,
                    cardname: cardname,
                    cardnumber: cardnumber,
                    expmonth: expmonth,
                    expyear: expyear,
                    cvv: cvv
                };

                fetch('/payments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(paymentData)
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    console.log('Payment added successfully:', data);
                    alert('Payment added successfully!');
                    document.getElementById('payment-form').reset();
                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);
                    alert('Error saving payment: Please check your input and try again.');
                });
            } else {
                alert('Please fill in all fields.');
            }
        });
    } else {
        console.error('One or more form elements not found!');
    }
});

document.addEventListener('DOMContentLoaded', function() {
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
            fetchCartItems(); // Sepet güncellenince verileri yeniden çek
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
                cartItemsContainer.innerHTML = ''; // Önceki içerikleri temizle

                data.forEach(item => {
                    addToCart(cartItemsContainer, item._id, item.name, item.price, item.imageSrc); // item._id to identify item
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
        li.dataset.id = id; // Set data attribute to identify the item

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

        // Çöp kovası simgesi
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fas', 'fa-trash', 'trash-icon');
        trashIcon.addEventListener('click', function() {
            const itemId = li.dataset.id; // Get item id
            deleteCartItem(itemId); // Delete item
        });
        li.appendChild(trashIcon);

        container.appendChild(li);
    }

    function deleteCartItem(itemId) {
        console.log(`Attempting to delete item with ID: ${itemId}`); // ID'yi logla
        fetch(`/add-to-cart/${itemId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (response.ok) return response.text();
            throw new Error('Network response was not ok.');
        })
        .then(message => {
            console.log(message); // Başarı mesajını logla
            fetchCartItems(); // Sepeti güncelle
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
            window.location.href = 'pay.html';
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
            console.log(productName, productPrice, productImageSrc); // Kontrol için log ekle
            saveProductToDatabase(productName, productPrice, productImageSrc);
            animateCart(); // Sepete ekleyince animasyon çalıştır
        });
    });

    cartIcon.addEventListener('click', function(event) {
        event.stopPropagation(); // Event'in yukarı doğru taşınmasını durdur
        cartItemsContainer.classList.toggle('active'); // Sepeti görünür/gizli yap
        if (cartItemsContainer.classList.contains('active')) {
            fetchCartItems(); // Sepet görünür olunca verileri çek
        }
    });

    // Sayfa herhangi bir yerine tıklanınca sepeti gizle
    document.addEventListener('click', function(event) {
        if (!cartItemsContainer.contains(event.target) && !cartIcon.contains(event.target)) {
            cartItemsContainer.classList.remove('active');
        }
    });

    // Sepet içindeki tıklamaların sepeti gizlemesini engelle
    cartItemsContainer.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Sayfa yüklendiğinde sepet verilerini çek
    fetchCartItems();
});

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


document.addEventListener('DOMContentLoaded', function() {
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

    // ScrollReveal().reveal(".review", {
    //     ...ScrollRevealOption,
    //     interval: 100,
    // });

    // ScrollReveal().reveal(".contact", {
    //     ...ScrollRevealOption,
    //     interval: 200,
    // })
    
});






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















// document.addEventListener('DOMContentLoaded', function() {
//     const addToCartButtons = document.querySelectorAll('.generally-button');
//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const productName = this.parentNode.parentNode.querySelector('h3').textContent.trim();
//             const productPrice = parseFloat(this.parentNode.parentNode.querySelector('.price').textContent.replace('$', '').split('\n')[0]);
//             const productImageSrc = this.parentNode.parentNode.querySelector('img').getAttribute('src');
//             saveProductToDatabase(productName, productPrice, productImageSrc);
//         });
//     });

//     const checkoutButton = document.querySelector('.checkout-button');
//     checkoutButton.addEventListener('click', function() {
//         alert('Checkout Now clicked!'); 
//     });
// });





// const CartItem = document.querySelector(".cart-items-container");
// const Navbar = document.querySelector(".navbar");

// //buttons
// const CartItemButton = document.querySelector("#cart-shopping");
// const Bars = document.querySelector("#bars");

// CartItemButton.addEventListener("click", function(){
//     CartItem.classList.toggle("active"); 
//     document.addEventListener("click",function(e){
//         if(!e.composedPath().includes(CartItemButton) && !e.composedPath().includes(CartItem) ){
//             CartItem.classList.remove("active"); 
//         }
//     });
// });

// Bars.addEventListener("click", function(){
//     Navbar.classList.toggle("location"); 
//     document.addEventListener("click",function(e){
//         if(!e.composedPath().includes(Bars) && !e.composedPath().includes(Navbar) ){
//             Navbar.classList.remove("location"); 
//         }
//     });
// });

// window.onload = function() {
//     var video = document.getElementById("about-Video");
//     if (video) {
//         video.play(); 
//         video.addEventListener('ended', function() { 
//             this.currentTime = 0; 
//             this.play(); 
//         }, false);
//     } else {
//         console.error("Video element not found!");
//     }
// };

// var ScrollRevealOption = {
//     duration: 1000,
//     easing: 'ease-in-out',
//     reset: true
// };

// document.addEventListener('DOMContentLoaded', function(){     
//     ScrollReveal().reveal(".home .content", {
//         ...ScrollRevealOption,
//         interval: 200,
//     });
//     // Diğer ScrollReveal efektlerini buraya ekleyin
// });

// document.addEventListener("DOMContentLoaded", function() {
//     const addToCartButtons = document.querySelectorAll('.generally-button');
//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const productName = this.parentNode.parentNode.querySelector('h3').textContent.trim();
//             const productPrice = parseFloat(this.parentNode.parentNode.querySelector('.price').textContent.replace('$', '').split('\n')[0]);
//             const productImageSrc = this.parentNode.parentNode.querySelector('img').getAttribute('src');
//             addToCart(productName, productPrice, productImageSrc);
//             animateCart();
//         });
//     });

//     const checkoutButton = document.querySelector('.checkout-button');
//     checkoutButton.addEventListener('click', function() {
//         alert('Checkout Now clicked!'); 
//     });
// });

// function addToCart(productName, price, imageSrc) {
//     const cartItems = document.querySelector('.cart-items-container');
//     const li = document.createElement('li');

//     const div = document.createElement('div'); 
//     div.style.textAlign = 'center'; 
//     li.appendChild(div); 

//     const img = document.createElement('img');
//     img.src = imageSrc;
//     img.alt = productName;
//     div.appendChild(img); 

//     const span = document.createElement('span');
//     span.textContent = `${productName} - $${price.toFixed(2)}`;
//     span.style.fontSize = '20px'; 
//     span.style.display = 'block'; 
//     div.appendChild(span); 

//     cartItems.appendChild(li);
//     cartItems.style.height = `${cartItems.children.length * 100}px`;
// }

// function animateCart() {
//     const cartIcon = document.getElementById('cart-shopping');
//     cartIcon.style.transform = 'scale(1.5)'; 
//     setTimeout(function() {
//         cartIcon.style.transform = 'scale(1)'; 
//     }, 500);
// }
