document.addEventListener('DOMContentLoaded', function () {
    fetchContacts();
    fetchPayments();
    fetchReviews();
    fetchCartItems();

    function fetchContacts() {
        fetch('/contacts')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#contacts-table tbody');
                data.forEach(contact => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${contact._id}</td>
                        <td>${contact.name}</td>
                        <td>${contact.email}</td>
                        <td>${contact.phone}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(err => console.error('Error fetching contacts:', err));
    }

    function fetchPayments() {
        fetch('/payments')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#payments-table tbody');
                data.forEach(payment => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${payment._id}</td>
                        <td>${payment.firstname}</td>
                        <td>${payment.address}</td>
                        <td>${payment.cardname}</td>
                        <td>${payment.cardnumber}</td>
                        <td>${payment.expmonth}</td>
                        <td>${payment.expyear}</td>
                        <td>${payment.cvv}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(err => console.error('Error fetching payments:', err));
    }

    function fetchReviews() {
        fetch('/reviews')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#reviews-table tbody');
                data.forEach(review => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${review._id}</td>
                        <td>${review.name}</td>
                        <td>${review.review}</td>
                        <td>${review.rating}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(err => console.error('Error fetching cart items:', err));
    }
    function fetchCartItems() {
        fetch('/add-to-cart')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#cart-table tbody');
                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item._id}</td>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td><img src="${item.imageSrc}" alt="${item.name}" width="50"></td>
                    `;
                    tableBody.appendChild(row);
                });
            });
    }
});