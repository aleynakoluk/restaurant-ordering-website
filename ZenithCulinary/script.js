const CartItem = document.querySelector(".cart-items-container");
const Navbar = document.querySelector(".navbar");

//buttons
const CartItemButton = document.querySelector("#cart-shopping");
const Bars = document.querySelector("#bars");




CartItemButton.addEventListener("click", function(){
    CartItem.classList.toggle("active"); // eğer toggle yerine add olsaydı,bir basmayla açılacaktı. çünkü yanına active ekledin o classın, ama toggle olunca her tıklama açıp kapanıyor
    document.addEventListener("click",function(e){
        if(!e.composedPath().includes(CartItemButton) && !e.composedPath().includes(CartItem) ){
            CartItem.classList.remove("active"); // herhangi yere basınca search butonu gidiyor
        }
    });
});

Bars.addEventListener("click", function(){
    Navbar.classList.toggle("location"); // eğer toggle yerine add olsaydı,bir basmayla açılacaktı. çünkü yanına active ekledin o classın, ama toggle olunca her tıklama açıp kapanıyor
    document.addEventListener("click",function(e){
        if(!e.composedPath().includes(Bars) && !e.composedPath().includes(Navbar) ){
            Navbar.classList.remove("location"); // herhangi yere basınca search butonu gidiyor
        }
    });
});

window.onload = function() {
    var video = document.getElementById("about-Video");
    if (video) {
        video.play(); // Videoyu otomatik olarak başlat
        video.addEventListener('ended', function() { // Video bittiğinde
            this.currentTime = 0; // Videoyu başa al
            this.play(); // Videoyu tekrar oynat
        }, false);
    } else {
        console.error("Video element not found!");
    }
};

var button = document.getElementById("contactButton");

// Add event listener for click event
button.addEventListener("click", function() {
    // Get form fields
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    
    // Check if form fields are filled out
    if (name.trim() === '' || email.trim() === '' || phone.trim() === '') {
        alert("Please fill out all fields before submitting.");
    } else {
        // Display the message
        alert("Your contact request has been processed.");
    }
});



var ScrollRevealOption = {
    // ScrollReveal seçeneklerini buraya ekleyin
    // Örneğin:
    duration: 1000,
    easing: 'ease-in-out',
    reset: true
};


document.addEventListener('DOMContentLoaded', function(){     
    ScrollReveal().reveal(".home .content", {
        ...ScrollRevealOption,
        interval: 200,
    });
    ScrollReveal().reveal(".about", {
        ...ScrollRevealOption,
        origin: 'bottom', // Aşağıdan başlayacak
        distance: '100px', // 100 piksel yukarıdan aşağı doğru kayacak
        duration: 1000, // Animasyon süresi (milisaniye cinsinden)
        delay: 200, // Gecikme süresi (milisaniye cinsinden)
    });
    ScrollReveal().reveal(".review", {
        ...ScrollRevealOption,
        origin: 'bottom', // Aşağıdan başlayacak
        distance: '100px', // 100 piksel yukarıdan aşağı doğru kayacak
        duration: 1000, // Animasyon süresi (milisaniye cinsinden)
        delay: 200, // Gecikme süresi (milisaniye cinsinden)
    });
    ScrollReveal().reveal(".contact", {
        ...ScrollRevealOption,
        origin: 'bottom', // Aşağıdan başlayacak
        distance: '100px', // 100 piksel yukarıdan aşağı doğru kayacak
        duration: 1000, // Animasyon süresi (milisaniye cinsinden)
        delay: 200, // Gecikme süresi (milisaniye cinsinden)
    });
    ScrollReveal().reveal(".menu", {
        ...ScrollRevealOption,
        origin: 'bottom', // Aşağıdan başlayacak
        distance: '100px', // 100 piksel yukarıdan aşağı doğru kayacak
        duration: 1000, // Animasyon süresi (milisaniye cinsinden)
        delay: 200, // Gecikme süresi (milisaniye cinsinden)
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.generally-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentNode.parentNode.querySelector('h3').textContent.trim();
            const productPrice = parseFloat(this.parentNode.parentNode.querySelector('.price').textContent.replace('$', '').split('\n')[0]);
            const productImageSrc = this.parentNode.parentNode.querySelector('img').getAttribute('src');
            addToCart(productName, productPrice, productImageSrc);
            animateCart();
        });
    });

    const checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.addEventListener('click', function() {
        alert('Checkout Now clicked!'); // Buraya istediğiniz checkout işlemlerini ekleyebilirsiniz.
    });
});

function addToCart(productName, price, imageSrc) {
    const cartItems = document.querySelector('.cart-items-container');
    const li = document.createElement('li');

    const div = document.createElement('div'); // Yeni bir div öğesi oluştur
    div.style.textAlign = 'center'; // İçeriğini ortala
    li.appendChild(div); // Li öğesine ekle

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = productName;
    div.appendChild(img); // Div öğesine ekle

    const span = document.createElement('span');
    span.textContent = `${productName} - $${price.toFixed(2)}`;
    span.style.fontSize = '20px'; // Ürün yazılarının boyutunu ayarlar
    span.style.display = 'block'; // Yeni bir satıra geç
    div.appendChild(span); // Div öğesine ekle

    cartItems.appendChild(li);

    // Sepet uzunluğunu güncelle
    cartItems.style.height = `${cartItems.children.length * 100}px`;
}

function animateCart() {
    const cartIcon = document.getElementById('cart-shopping');
    cartIcon.style.transform = 'scale(1.5)'; // Yüzde 20 büyütme animasyonu
    setTimeout(function() {
        cartIcon.style.transform = 'scale(1)'; // 0.5 saniye sonra normal boyuta geri dönme
    }, 500);
}

