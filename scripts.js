function showPage(pageId) {
    var pages = document.getElementsByClassName('page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    document.getElementById(pageId).style.display = 'block';

    if (pageId === 'products') {
        displayProducts();
    }
}

document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var reviewText = document.getElementById('review').value;
    var rating = document.getElementById('rating').value;

    var review = {
        name: name,
        email: email,
        reviewText: reviewText,
        rating: rating
    };

    addReview(review);
    document.getElementById('reviewForm').reset();
});

function addReview(review) {
    var reviewsDiv = document.getElementById('reviews');
    var reviewDiv = document.createElement('div');
    reviewDiv.className = 'review';

    reviewDiv.innerHTML = `
        <h3>${review.name}</h3>
        <p>${review.reviewText}</p>
        <p>Rating: ${review.rating}</p>
    `;

    reviewsDiv.appendChild(reviewDiv);
}

function displayProducts() {
    var productsDiv = document.getElementById('products-list');
    productsDiv.innerHTML = '';

    products.forEach(function(product) {
        var productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-icon">
            <div class="product-info">
                <h2>${product.name}</h2>
                <p>Price: ${product.price}</p>
                <p>Domain: ${product.domain}</p>
            </div>
        `;

        productsDiv.appendChild(productDiv);
    });
}
