function showPage(pageId) {
    var pages = document.getElementsByClassName('page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    document.getElementById(pageId).style.display = 'block';

    if (pageId === 'products') {
        displayProducts();
    } else if (pageId === 'home') {
        startCourseDisplay();
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

var currentCourseIndex = 0;
var courseInterval;

function startCourseDisplay() {
    clearInterval(courseInterval);
    displayNextCourse();
    courseInterval = setInterval(displayNextCourse, 3000);
}

function displayNextCourse() {
    var courseDisplay = document.getElementById('course-display');
    var course = products[currentCourseIndex];

    courseDisplay.style.opacity = 0;
    setTimeout(function() {
        courseDisplay.innerHTML = `
            <h2>${course.name}</h2>
            <p>Price: ${course.price}</p>
            <p>Domain: ${course.domain}</p>
        `;
        courseDisplay.style.opacity = 1;
    }, 500);

    currentCourseIndex = (currentCourseIndex + 1) % products.length;
}

function prevCourse() {
    currentCourseIndex = (currentCourseIndex - 1 + products.length) % products.length;
    displayCourse();
}

function nextCourse() {
    currentCourseIndex = (currentCourseIndex + 1) % products.length;
    displayCourse();
}

function displayCourse() {
    var courseDisplay = document.getElementById('course-display');
    var course = products[currentCourseIndex];

    courseDisplay.style.opacity = 0;
    setTimeout(function() {
        courseDisplay.innerHTML = `
            <h2>${course.name}</h2>
            <p>Price: ${course.price}</p>
            <p>Domain: ${course.domain}</p>
        `;
        courseDisplay.style.opacity = 1;
    }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    showPage('home');
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('reg-name').value;
    var email = document.getElementById('reg-email').value;
    var password = document.getElementById('reg-password').value;

    var user = {
        name: name,
        email: email,
        password: password
    };

    var users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    showPage('login');
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;

    var users = JSON.parse(localStorage.getItem('users')) || [];
    var user = users.find(function(user) {
        return user.email === username && user.password === password;
    });

    if (user) {
        alert('Logged in successfully!');
        document.getElementById('login-btn').textContent = 'Logout';
        document.getElementById('login-btn').onclick = function() {
            alert('Logged out successfully!');
            document.getElementById('login-btn').textContent = 'Login';
            document.getElementById('login-btn').onclick = function() {
                showPage('login');
            };
        };
        showPage('home');
    } else {
        document.getElementById('login-error').textContent = 'Wrong credentials';
    }
});
